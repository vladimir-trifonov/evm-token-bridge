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

  const [FW7Token, FW7Bridge] = await Promise.all([
    ethers.getContractFactory("FW7Token"),
    ethers.getContractFactory("FW7Bridge"),
  ]);

  const fw7Token = await FW7Token.deploy();
  await fw7Token.deployed();
  const fw7Bridge = await FW7Bridge.deploy(fw7Token.address);
  await fw7Bridge.deployed();

  console.log("FW7Token deployed to:", fw7Token.address);
  console.log("FW7Bridge deployed to:", fw7Bridge.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
