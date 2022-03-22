/* eslint-disable camelcase */
import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer, utils } from "ethers";
import { XFW7Token, XFW7Token__factory } from "../typechain-types";
import { MockContract, smock } from "@defi-wonderland/smock";

describe("XFW7Token", function () {
  let _gateway: string;
  let _recipient: string;
  let accounts: Signer[];
  let xfw7Token: MockContract<XFW7Token>;
  const _amount = utils.parseEther("100");
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  before(async function () {
    accounts = await ethers.getSigners();
    _gateway = await accounts[1].getAddress();
    _recipient = await accounts[2].getAddress();
  });

  beforeEach(async () => {
    const xfw7TokenFactory = await smock.mock<XFW7Token__factory>("XFW7Token");
    xfw7Token = await xfw7TokenFactory.deploy();
  });

  it("Should update gateway", async function () {
    await xfw7Token.connect(accounts[0]).gatewayUpdate(_gateway);

    expect(await xfw7Token.gateway()).to.be.equals(_gateway);
  });

  it("Should be reverted when not an owner", async function () {
    await expect(
      xfw7Token.connect(accounts[1]).gatewayUpdate(_gateway)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should be reverted on wrong gateway", async function () {
    await expect(
      xfw7Token.connect(accounts[0]).gatewayUpdate(zeroAddress)
    ).to.be.revertedWith("Don't abandon the bridge");
  });

  it("Should be reverted on wrong bridge", async function () {
    await expect(
      xfw7Token.connect(accounts[1]).mintTo(_recipient, _amount)
    ).to.be.revertedWith("Only bridge can execute");
  });
});
