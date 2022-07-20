import { inject, injectable } from 'tsyringe';
import { SupplyChain } from 'typechain-types';
import QualityCheck from '../entities/QualityCheck';

export function mapQualityCheckArrayToObject([
  company,
  process,
  processParameters,
  date,
]: any) {
  const qualityCheck: QualityCheck = {
    company,
    process,
    processParameters,
    date: date.toString(),
  };

  return qualityCheck;
}

@injectable()
class QualityCheckService {
  private supplyChain: SupplyChain;

  constructor(
    @inject('SupplyChainProvider')
    supplyChain: SupplyChain,
  ) {
    this.supplyChain = supplyChain;
  }

  public async create(
    id: number,
    { company, process, processParameters, date }: QualityCheck,
  ) {
    const qualityCheck: QualityCheck = {
      company,
      process,
      processParameters,
      date,
    };

    const transactionResponse = await this.supplyChain.addQualityCheck(
      id,
      qualityCheck.company,
      qualityCheck.process,
      qualityCheck.processParameters,
      qualityCheck.date,
    );

    await transactionResponse.wait(1);
  }
  public async get(id: number) {
    return (await this.supplyChain.getPartQualityCheck(id)).map(
      mapQualityCheckArrayToObject,
    );
  }
}

export default QualityCheckService;
