import { ethers } from 'hardhat';
import { injectable } from 'tsyringe';
import { SupplyChain } from 'typechain-types';

@injectable()
export default class HardhatSupplyChainProvider {
  public static async build() {
    const SupplyChain = await ethers.getContractFactory('SupplyChain');
    const supplyChain = await SupplyChain.deploy();

    const [owner, manufacturer, designer, company] = await ethers.getSigners();

    console.log(
      ` Owner: ${owner.address}\n`,
      `Manufacturer ${manufacturer.address}\n`,
      `Designer: ${designer.address}\n`,
      `Company: ${company.address}\n`,
    );

    return supplyChain;
  }
}
