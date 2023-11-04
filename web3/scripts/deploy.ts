import { ethers } from "hardhat";

async function main() {
  const CrowdFunding = await ethers.deployContract('CrowdFunding');
  await CrowdFunding.waitForDeployment();
  console.log(`CrowdFunding deployed to ${CrowdFunding?.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
