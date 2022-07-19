import { SupplyChain } from '../../../typechain-types';
import QualityCheck from '../entities/QualityCheck';

export default (supplyChain: SupplyChain) => {
  const self = {
    create: async (
      id: number,
      { company, process, processParameters, date }: QualityCheck,
    ) => {
      const qualityCheck: QualityCheck = {
        company,
        process,
        processParameters,
        date,
      };

      const transactionResponse = await supplyChain.addQualityCheck(
        id,
        qualityCheck.company,
        qualityCheck.process,
        qualityCheck.processParameters,
        qualityCheck.date,
      );

      await transactionResponse.wait(1);
    },
    get: async (id: number) => {
      return (await supplyChain.getPartQualityCheck(id)).map(
        ([company, process, processParameters, date]) => {
          const qualityCheck: QualityCheck = {
            company,
            process,
            processParameters,
            date: date.toString(),
          };

          return qualityCheck;
        },
      );
    },
  };
  return self;
};
