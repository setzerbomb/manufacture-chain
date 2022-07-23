import { ethers } from 'hardhat';

import { inject, injectable } from 'tsyringe';
import { SupplyChain } from 'typechain-types';
import PostProcessing from '../entities/PostProcessing';

export function mapPostProcessArrayToObject([
  company,
  process,
  processParameters,
  date,
]: any) {
  const postProcessing: PostProcessing = {
    company,
    process,
    processParameters,
    date: date.toString(),
  };

  return postProcessing;
}

@injectable()
class PostProcessingService {
  private supplyChain: SupplyChain;

  constructor(
    @inject('SupplyChainProvider')
    supplyChain: SupplyChain,
  ) {
    this.supplyChain = supplyChain;
  }

  public async create(
    id: number,
    { company, process, processParameters, date }: PostProcessing,
  ) {
    const postProcessing: PostProcessing = {
      company,
      process,
      processParameters: ethers.utils.id(processParameters),
      date,
    };

    const transactionResponse = await this.supplyChain.addPostProcessing(
      id,
      postProcessing.company,
      postProcessing.process,
      postProcessing.processParameters,
      postProcessing.date,
    );

    await transactionResponse.wait(1);
  }
  public async get(id: number) {
    return (await this.supplyChain.getPartPostProcessing(id)).map(
      mapPostProcessArrayToObject,
    );
  }
}

export default PostProcessingService;
