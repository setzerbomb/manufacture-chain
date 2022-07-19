import { SupplyChain } from '../../../typechain-types';
import PostProcessing from '../entities/PostProcessing';

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
        ([company, process, processParameters, date]) => {
          const postProcessing: PostProcessing = {
            company,
            process,
            processParameters,
            date: date.toString(),
          };

          return postProcessing;
        },
      );
    },
  };
  return self;
};
