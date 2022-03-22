/* eslint-disable camelcase */
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, Signer, utils } from "ethers";
import { XFW7Token, XFW7Bridge, XFW7Bridge__factory } from "../typechain-types";
import { MockContract, FakeContract, smock } from "@defi-wonderland/smock";

describe("XFW7Bridge", function () {
  let xfw7Token: FakeContract<XFW7Token>;
  let xfw7Bridge: MockContract<XFW7Bridge>;
  let accounts: Signer[];

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
    xfw7Token = await smock.fake<XFW7Token>("XFW7Token");
    const xfw7BridgeFactory = await smock.mock<XFW7Bridge__factory>(
      "XFW7Bridge"
    );
    xfw7Bridge = await xfw7BridgeFactory.deploy(xfw7Token.address);
  });

  context("depositTokens", () => {
    it("Should burn tokens", async function () {
      await xfw7Bridge
        .connect(accounts[0])
        .depositTokens(_receiver, _amount, _deadline, _v, _r, _s);

      expect(xfw7Token.burnFrom.atCall(0).getCallCount()).to.be.equals(1);
      expect(xfw7Token.burnFrom.getCall(0).args[0]).to.be.equals(sender);
      expect(xfw7Token.burnFrom.getCall(0).args[1]).to.be.equals(_amount);
      expect(xfw7Token.permit.getCall(0).args[0]).to.be.equals(sender);
      expect(xfw7Token.permit.getCall(0).args[1]).to.be.equals(
        xfw7Bridge.address
      );
      expect(xfw7Token.permit.getCall(0).args[2]).to.be.equals(_amount);
      expect(xfw7Token.permit.getCall(0).args[3]).to.be.equals(_deadline);
      expect(xfw7Token.permit.getCall(0).args[4]).to.be.equals(_v);
      expect(xfw7Token.permit.getCall(0).args[5]).to.be.equals(_r);
      expect(xfw7Token.permit.getCall(0).args[6]).to.be.equals(_s);
    });

    it("Should be reverted on wrong receiver", async function () {
      await expect(
        xfw7Bridge
          .connect(accounts[0])
          .depositTokens(zeroAddress, _amount, _deadline, _v, _r, _s)
      ).to.be.revertedWith("Wrong receiver");
    });

    it("Should be reverted on insufficient tokens", async function () {
      await expect(
        xfw7Bridge
          .connect(accounts[0])
          .depositTokens(
            _receiver,
            utils.parseEther("0"),
            _deadline,
            _v,
            _r,
            _s
          )
      ).to.be.revertedWith("Insufficient tokens");
    });

    it("Should emit DepositTokens", async function () {
      await expect(
        xfw7Bridge
          .connect(accounts[0])
          .depositTokens(_receiver, _amount, _deadline, _v, _r, _s)
      )
        .to.emit(xfw7Bridge, "DepositTokens")
        .withArgs(sender, _receiver, _amount);
    });
  });

  context("tokensBridged", () => {
    it("Should increase bridged tokens", async function () {
      await xfw7Bridge
        .connect(accounts[0])
        .tokensBridged(_receiver, _amount, _otherChainTransactionHash);

      expect(await xfw7Bridge.bridged(_receiver)).to.be.equals(_amount);
      expect(
        await xfw7Bridge.processedHashes(_otherChainTransactionHash)
      ).to.be.equals(true);
    });

    it("Should be reverted when not an owner", async function () {
      await expect(
        xfw7Bridge
          .connect(accounts[1])
          .tokensBridged(_receiver, _amount, _otherChainTransactionHash)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should be reverted on insufficient tokens", async function () {
      await expect(
        xfw7Bridge
          .connect(accounts[0])
          .tokensBridged(
            _receiver,
            utils.parseEther("0"),
            _otherChainTransactionHash
          )
      ).to.be.revertedWith("Insufficient tokens");
    });

    it("Should be reverted on already processed transaction", async function () {
      await xfw7Bridge.setVariable("processedHashes", {
        [_otherChainTransactionHash]: true,
      });

      await expect(
        xfw7Bridge
          .connect(accounts[0])
          .tokensBridged(_receiver, _amount, _otherChainTransactionHash)
      ).to.be.revertedWith("Transfer already processed");
    });

    it("Should emit TokensBridged", async function () {
      await expect(
        xfw7Bridge
          .connect(accounts[0])
          .tokensBridged(_receiver, _amount, _otherChainTransactionHash)
      )
        .to.emit(xfw7Bridge, "TokensBridged")
        .withArgs(_receiver, _amount, _otherChainTransactionHash);
    });
  });

  context("claimTokens", () => {
    it("Should decrease bridged tokens", async function () {
      await xfw7Bridge.setVariable("bridged", { [sender]: _amount });

      await xfw7Bridge.connect(accounts[0]).claimTokens();

      expect(await xfw7Bridge.bridged(sender)).to.be.equals(0);
      expect(xfw7Token.mintTo.atCall(0).getCallCount()).to.be.equals(1);
      expect(xfw7Token.mintTo.getCall(0).args[0]).to.be.equals(sender);
      expect(xfw7Token.mintTo.getCall(0).args[1]).to.be.equals(_amount);
    });

    it("Should be reverted on insufficient bridged tokens", async function () {
      await xfw7Bridge.setVariable("bridged", { [sender]: 0 });

      await expect(
        xfw7Bridge.connect(accounts[0]).claimTokens()
      ).to.be.revertedWith("Insufficient bridged tokens");
    });

    it("Should emit ClaimTokens", async function () {
      await xfw7Bridge.setVariable("bridged", { [sender]: _amount });

      await expect(xfw7Bridge.connect(accounts[0]).claimTokens())
        .to.emit(xfw7Bridge, "ClaimTokens")
        .withArgs(sender, _amount);
    });
  });

  context("returnTokens", () => {
    it("Should decrease bridged tokens", async function () {
      await xfw7Bridge.setVariable("bridged", { [sender]: _amount });

      await xfw7Bridge.connect(accounts[0]).returnTokens(sender);

      expect(await xfw7Bridge.bridged(sender)).to.be.equals(0);
    });

    it("Should be reverted on wrong receiver", async function () {
      await expect(
        xfw7Bridge.connect(accounts[0]).returnTokens(zeroAddress)
      ).to.be.revertedWith("Wrong receiver");
    });

    it("Should be reverted on Insufficient bridged tokens", async function () {
      await xfw7Bridge.setVariable("bridged", { [sender]: 0 });

      await expect(
        xfw7Bridge.connect(accounts[0]).returnTokens(sender)
      ).to.be.revertedWith("Insufficient bridged tokens");
    });

    it("Should emit ReturnTokens", async function () {
      await xfw7Bridge.setVariable("bridged", { [sender]: _amount });

      await expect(xfw7Bridge.connect(accounts[0]).returnTokens(sender))
        .to.emit(xfw7Bridge, "ReturnTokens")
        .withArgs(sender, sender, _amount);
    });
  });
});
