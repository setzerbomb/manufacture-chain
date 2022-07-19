import { SupplyChain } from '../../../typechain-types';
import Part from '../entities/Part';

export default (supplyChain: SupplyChain) => {
  const self = {
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
        postProcessing: retrievedPartArray['post_processing'],
        qualityCheck: retrievedPartArray['quality_check'],
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
