import { ethers } from "hardhat";

async function main() {
  const vendingMachine = await ethers.deployContract('VendingMachine');
  await vendingMachine.waitForDeployment();
  console.log(`Cupcake vending machine deployed to ${vendingMachine?.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
