import { ethers } from 'hardhat';
import { injectable } from 'tsyringe';
import { SupplyChain } from 'typechain-types';

@injectable()
export default class HardhatSupplyChainProvider {
  public static async build() {
    const SupplyChain = await ethers.getContractFactory('SupplyChain');
    const supplyChain = await SupplyChain.deploy();

    return supplyChain;
  }
}
