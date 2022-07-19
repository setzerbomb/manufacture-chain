import { ethers } from 'hardhat';
import PartService, { IPartService } from './PartService';
import PostProcessingService from './PostProcessingService';
import QualityCheckService from './QualityCheckService';

export interface ILoader {
  partService: IPartService;
}

export default async () => {
  const SupplyChain = await ethers.getContractFactory('SupplyChain');
  const supplyChain = await SupplyChain.deploy();

  return {
    partService: PartService(supplyChain),
  };
};
