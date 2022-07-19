import { SupplyChain } from '../../../typechain-types';
import Part from '../entities/Part';
import { mapPostProcessArrayToObject } from './PostProcessingService';
import { mapQualityCheckArrayToObject } from './QualityCheckService';

export interface IPartService {
  create: (part: Part) => void;
  get: (id: number) => Promise<Part>;
  modifyOwnership: (id: number, newOwner: string) => void;
}

export default (supplyChain: SupplyChain) => {
  const self: IPartService = {
    create: async ({
      ownership,
      designedBy,
      manufacturedBy,
      manufacturingDate,
      process,
      processParameters,
    }: Part) => {
      const part: Part = {
        ownership,
        manufacturedBy,
        designedBy,
        manufacturingDate,
        process,
        processParameters,
      };

      const transactionResponse = await supplyChain.createPart(
        part.ownership,
        part.manufacturedBy,
        part.designedBy,
        part.process,
        part.processParameters,
        part.manufacturingDate,
      );

      await transactionResponse.wait(1);
    },
    get: async (id: number) => {
      const retrievedPartArray = await supplyChain.getPart(id);

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
    },
    modifyOwnership: async (id: number, newOwner: string) => {
      const transactionResponse = await supplyChain.modifyOwnership(
        id,
        newOwner,
      );

      await transactionResponse.wait(1);
    },
  };
  return self;
};
