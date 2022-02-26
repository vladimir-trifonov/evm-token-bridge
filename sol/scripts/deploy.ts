// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account: " + deployer.address);

  const [FW7Token, XFW7Token, FW7Bridge, XFW7Bridge] = await Promise.all([
    ethers.getContractFactory("FW7Token"),
    ethers.getContractFactory("XFW7Token"),
    ethers.getContractFactory("FW7Bridge"),
    ethers.getContractFactory("XFW7Bridge"),
  ]);

  const [fw7Token, xfw7Token] = await Promise.all([
    FW7Token.deploy(1000000000),
    XFW7Token.deploy(),
  ]);

  await Promise.all([fw7Token.deployed(), xfw7Token.deployed()]);

  const [fw7Bridge, xfw7Bridge] = await Promise.all([
    FW7Bridge.deploy(fw7Token.address, deployer.address),
    XFW7Bridge.deploy(xfw7Token.address, deployer.address),
  ]);

  await Promise.all([fw7Bridge.deployed(), xfw7Bridge.deployed()]);

  console.log("FW7Token deployed to:", fw7Token.address);
  console.log("XFW7Token deployed to:", xfw7Token.address);
  console.log("FW7Bridge deployed to:", fw7Bridge.address);
  console.log("XFW7Bridge deployed to:", xfw7Bridge.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
