import { inject, injectable } from 'tsyringe';
import { SupplyChain } from 'typechain-types';
import Part from '../entities/Part';
import { mapPostProcessArrayToObject } from './PostProcessingService';
import { mapQualityCheckArrayToObject } from './QualityCheckService';

export interface IPartService {
  create: (part: Part) => void;
  get: (id: number) => Promise<Part>;
  modifyOwnership: (id: number, newOwner: string) => void;
}

@injectable()
class PartService {
  private supplyChain: SupplyChain;

  constructor(
    @inject('SupplyChainProvider')
    supplyChain: SupplyChain,
  ) {
    this.supplyChain = supplyChain;
  }

  public async create({
    ownership,
    designedBy,
    manufacturedBy,
    manufacturingDate,
    process,
    processParameters,
  }: Part): Promise<void> {
    const part: Part = {
      ownership,
      manufacturedBy,
      designedBy,
      manufacturingDate,
      process,
      processParameters,
    };

    const transactionResponse = await this.supplyChain.createPart(
      part.ownership,
      part.manufacturedBy,
      part.designedBy,
      part.process,
      part.processParameters,
      part.manufacturingDate,
    );

    await transactionResponse.wait(1);
  }

  public async get(id: number): Promise<Part> {
    const retrievedPartArray = await this.supplyChain.getPart(id);

    const retrievedPart: Part = {
      id: retrievedPartArray['id'].toNumber(),
      ownership: retrievedPartArray['ownership'],
      manufacturedBy: retrievedPartArray['manufacturedBy'],
      designedBy: retrievedPartArray['designedBy'],
      manufacturingDate: retrievedPartArray['manufacturing_date'].toString(),
      process: retrievedPartArray['process'],
      processParameters: retrievedPartArray['process_parameters'],
      postProcessing: retrievedPartArray['post_processing'].map(
        mapPostProcessArrayToObject,
      ),
      qualityCheck: retrievedPartArray['quality_check'].map(
        mapQualityCheckArrayToObject,
      ),
    };

    return retrievedPart;
  }

  public async modifyOwnership(id: number, newOwner: string) {
    const transactionResponse = await this.supplyChain.modifyOwnership(
      id,
      newOwner,
    );

    await transactionResponse.wait(1);
  }
}

export default PartService;
