/* eslint-disable camelcase */
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, Signer, utils } from "ethers";
import { FW7Token, FW7Bridge, FW7Bridge__factory } from "../typechain-types";
import { MockContract, FakeContract, smock } from "@defi-wonderland/smock";

describe("FW7Bridge", function () {
  let fw7Token: FakeContract<FW7Token>;
  let fw7Bridge: MockContract<FW7Bridge>;
  let accounts: Signer[];
  const fee = utils.parseEther("0.005");

  let sender: string;
  let _receiver: string;
  const zeroAddress = "0x0000000000000000000000000000000000000000";
  const _amount = utils.parseEther("100");
  const _deadline = BigNumber.from(new Date().valueOf());
  const _v = 1;
  const _r = utils.formatBytes32String("mocked_r");
  const _s = utils.formatBytes32String("mocked_s");
  const _otherChainTransactionHash = utils.formatBytes32String("mocked_hash");

  before(async function () {
    accounts = await ethers.getSigners();
    sender = await accounts[0].getAddress();
    _receiver = await accounts[1].getAddress();
  });

  beforeEach(async () => {
    fw7Token = await smock.fake<FW7Token>("FW7Token");
    const fw7BridgeFactory = await smock.mock<FW7Bridge__factory>("FW7Bridge");
    fw7Bridge = await fw7BridgeFactory.deploy(fw7Token.address);
  });

  context("depositTokens", () => {
    it("Should return the fee", async function () {
      expect(await fw7Bridge.fee()).to.be.equal(fee);
    });

    it("Should transfer tokens", async function () {
      fw7Token.transferFrom
        .whenCalledWith(sender, fw7Bridge.address, _amount)
        .returns(true);

      await fw7Bridge
        .connect(accounts[0])
        .depositTokens(_receiver, _amount, _deadline, _v, _r, _s, {
          value: fee,
        });

      expect(await fw7Bridge.locked()).to.be.equals(_amount);
      expect(fw7Token.transferFrom.atCall(0).getCallCount()).to.be.equals(1);
      expect(fw7Token.permit.getCall(0).args[0]).to.be.equals(sender);
      expect(fw7Token.permit.getCall(0).args[1]).to.be.equals(
        fw7Bridge.address
      );
      expect(fw7Token.permit.getCall(0).args[2]).to.be.equals(_amount);
      expect(fw7Token.permit.getCall(0).args[3]).to.be.equals(_deadline);
      expect(fw7Token.permit.getCall(0).args[4]).to.be.equals(_v);
      expect(fw7Token.permit.getCall(0).args[5]).to.be.equals(_r);
      expect(fw7Token.permit.getCall(0).args[6]).to.be.equals(_s);
    });

    it("Should be reverted on wrong receiver", async function () {
      await expect(
        fw7Bridge
          .connect(accounts[0])
          .depositTokens(zeroAddress, _amount, _deadline, _v, _r, _s, {
            value: fee,
          })
      ).to.be.revertedWith("Wrong receiver");
    });

    it("Should be reverted when fails to transfer", async function () {
      fw7Token.transferFrom
        .whenCalledWith(sender, fw7Bridge.address, _amount)
        .returns(false);

      await expect(
        fw7Bridge
          .connect(accounts[0])
          .depositTokens(_receiver, _amount, _deadline, _v, _r, _s, {
            value: fee,
          })
      ).to.be.revertedWith("Failed to transfer");
    });

    it("Should be reverted on insufficient fee", async function () {
      await expect(
        fw7Bridge
          .connect(accounts[0])
          .depositTokens(_receiver, _amount, _deadline, _v, _r, _s, {
            value: utils.parseEther("0.004"),
          })
      ).to.be.revertedWith("Insufficient fee");
    });

    it("Should be reverted on insufficient tokens", async function () {
      await expect(
        fw7Bridge
          .connect(accounts[0])
          .depositTokens(
            _receiver,
            utils.parseEther("0"),
            _deadline,
            _v,
            _r,
            _s,
            {
              value: fee,
            }
          )
      ).to.be.revertedWith("Insufficient tokens");
    });

    it("Should emit DepositTokens", async function () {
      fw7Token.transferFrom
        .whenCalledWith(sender, fw7Bridge.address, _amount)
        .returns(true);

      await expect(
        fw7Bridge
          .connect(accounts[0])
          .depositTokens(_receiver, _amount, _deadline, _v, _r, _s, {
            value: fee,
          })
      )
        .to.emit(fw7Bridge, "DepositTokens")
        .withArgs(sender, _receiver, _amount);
    });
  });

  context("tokensBridged", () => {
    it("Should increase bridged tokens", async function () {
      await fw7Bridge
        .connect(accounts[0])
        .tokensBridged(_receiver, _amount, _otherChainTransactionHash);

      expect(await fw7Bridge.bridged(_receiver)).to.be.equals(_amount);
      expect(
        await fw7Bridge.processedHashes(_otherChainTransactionHash)
      ).to.be.equals(true);
    });

    it("Should be reverted on wrong receiver", async function () {
      await expect(
        fw7Bridge
          .connect(accounts[0])
          .tokensBridged(zeroAddress, _amount, _otherChainTransactionHash)
      ).to.be.revertedWith("Wrong receiver");
    });

    it("Should be reverted when not an owner", async function () {
      await expect(
        fw7Bridge
          .connect(accounts[1])
          .tokensBridged(_receiver, _amount, _otherChainTransactionHash)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should be reverted on insufficient tokens", async function () {
      await expect(
        fw7Bridge
          .connect(accounts[0])
          .tokensBridged(
            _receiver,
            utils.parseEther("0"),
            _otherChainTransactionHash
          )
      ).to.be.revertedWith("Insufficient tokens");
    });

    it("Should be reverted on already processed transaction", async function () {
      await fw7Bridge.setVariable("processedHashes", {
        [_otherChainTransactionHash]: true,
      });

      await expect(
        fw7Bridge
          .connect(accounts[0])
          .tokensBridged(_receiver, _amount, _otherChainTransactionHash)
      ).to.be.revertedWith("Transfer already processed");
    });

    it("Should emit TokensBridged", async function () {
      await expect(
        fw7Bridge
          .connect(accounts[0])
          .tokensBridged(_receiver, _amount, _otherChainTransactionHash)
      )
        .to.emit(fw7Bridge, "TokensBridged")
        .withArgs(_receiver, _amount, _otherChainTransactionHash);
    });
  });

  context("claimTokens", () => {
    it("Should decrease bridged tokens", async function () {
      fw7Token.transfer.whenCalledWith(sender, _amount).returns(true);
      await fw7Bridge.setVariable("locked", _amount);
      await fw7Bridge.setVariable("bridged", { [sender]: _amount });

      await fw7Bridge.connect(accounts[0]).claimTokens({ value: fee });

      expect(await fw7Bridge.bridged(sender)).to.be.equals(0);
      expect(await fw7Bridge.locked()).to.be.equals(0);
    });

    it("Should be reverted on insufficient fee", async function () {
      await expect(
        fw7Bridge
          .connect(accounts[0])
          .claimTokens({ value: utils.parseEther("0.004") })
      ).to.be.revertedWith("Insufficient fee");
    });

    it("Should be reverted on insufficient tokens", async function () {
      await fw7Bridge.setVariable("locked", _amount);
      await fw7Bridge.setVariable("bridged", { [sender]: 0 });

      await expect(
        fw7Bridge.connect(accounts[0]).claimTokens({ value: fee })
      ).to.be.revertedWith("Insufficient tokens");
    });

    it("Should be reverted on insufficient locked tokens", async function () {
      await fw7Bridge.setVariable("locked", 0);
      await fw7Bridge.setVariable("bridged", { [sender]: _amount });

      await expect(
        fw7Bridge.connect(accounts[0]).claimTokens({ value: fee })
      ).to.be.revertedWith("Insufficient locked tokens");
    });

    it("Should be reverted when fails to transfer", async function () {
      fw7Token.transfer.whenCalledWith(sender, _amount).returns(false);
      await fw7Bridge.setVariable("locked", _amount);
      await fw7Bridge.setVariable("bridged", { [sender]: _amount });

      await expect(
        fw7Bridge.connect(accounts[0]).claimTokens({ value: fee })
      ).to.be.revertedWith("Failed to transfer");
    });

    it("Should emit ClaimTokens", async function () {
      fw7Token.transfer.whenCalledWith(sender, _amount).returns(true);
      await fw7Bridge.setVariable("locked", _amount);
      await fw7Bridge.setVariable("bridged", { [sender]: _amount });

      await expect(fw7Bridge.connect(accounts[0]).claimTokens({ value: fee }))
        .to.emit(fw7Bridge, "ClaimTokens")
        .withArgs(sender, _amount);
    });
  });

  context("returnTokens", () => {
    it("Should decrease bridged tokens", async function () {
      fw7Token.transfer.whenCalledWith(sender, _amount).returns(true);
      await fw7Bridge.setVariable("bridged", { [sender]: _amount });

      await fw7Bridge.connect(accounts[0]).returnTokens(sender, { value: fee });

      expect(await fw7Bridge.bridged(sender)).to.be.equals(0);
      expect(await fw7Bridge.locked()).to.be.equals(0);
    });

    it("Should be reverted on wrong receiver", async function () {
      await expect(
        fw7Bridge.connect(accounts[0]).returnTokens(zeroAddress, { value: fee })
      ).to.be.revertedWith("Wrong receiver");
    });

    it("Should be reverted on insufficient fee", async function () {
      await expect(
        fw7Bridge
          .connect(accounts[0])
          .returnTokens(sender, { value: utils.parseEther("0.004") })
      ).to.be.revertedWith("Insufficient fee");
    });

    it("Should be reverted on Insufficient bridged tokens", async function () {
      await fw7Bridge.setVariable("bridged", { [sender]: 0 });

      await expect(
        fw7Bridge.connect(accounts[0]).returnTokens(sender, { value: fee })
      ).to.be.revertedWith("Insufficient bridged tokens");
    });

    it("Should emit ReturnTokens", async function () {
      fw7Token.transfer.whenCalledWith(sender, _amount).returns(true);
      await fw7Bridge.setVariable("bridged", { [sender]: _amount });

      await expect(
        fw7Bridge.connect(accounts[0]).returnTokens(sender, { value: fee })
      )
        .to.emit(fw7Bridge, "ReturnTokens")
        .withArgs(sender, sender, _amount);
    });
  });

  context("withdraw", () => {
    it("Should increase owner's balance", async function () {
      fw7Token.transfer.whenCalledWith(sender, _amount).returns(true);
      await fw7Bridge.setVariable("bridged", { [sender]: _amount });

      await fw7Bridge.connect(accounts[0]).returnTokens(sender, { value: fee });

      const prevBalance = await accounts[0].getBalance();
      await fw7Bridge.connect(accounts[0]).withdraw();
      const ownersBalance = await accounts[0].getBalance();

      expect(ownersBalance.sub(prevBalance).toNumber()).to.be.greaterThan(0);
    });

    it("Should be reverted when not an owner", async function () {
      await expect(
        fw7Bridge.connect(accounts[1]).withdraw()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
