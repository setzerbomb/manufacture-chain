import { SupplyChain } from '../../../typechain-types';
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

export default (supplyChain: SupplyChain) => {
  const self = {
    create: async (
      id: number,
      { company, process, processParameters, date }: PostProcessing,
    ) => {
      const postProcessing: PostProcessing = {
        company,
        process,
        processParameters,
        date,
      };

      const transactionResponse = await supplyChain.addPostProcessing(
        id,
        postProcessing.company,
        postProcessing.process,
        postProcessing.processParameters,
        postProcessing.date,
      );

      await transactionResponse.wait(1);
    },
    get: async (id: number) => {
      return (await supplyChain.getPartPostProcessing(id)).map(
        mapPostProcessArrayToObject,
      );
    },
  };
  return self;
};
