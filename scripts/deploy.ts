import { ethers } from "hardhat";

async function main() {
  const SupplyChain = await ethers.getContractFactory("SupplyChain");
  const supplyChain = await SupplyChain.deploy();

  await supplyChain.deployed();

  console.log("SupplyChain with 1 ETH deployed to:", supplyChain.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
