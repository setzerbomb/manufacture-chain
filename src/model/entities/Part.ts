import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber } from 'ethers';

export default interface Part {
  id?: number;
  ownership: string;
  manufacturedBy: string;
  designedBy: string;
  process: string;
  processParameters: string;
  manufacturingDate: string;
  postProcessing?: any[];
  qualityCheck?: any[];
}
