import { expect } from 'chai';
import HardhatSupplyChainProvider from './HardhatSupplyChainProvider';
import { SupplyChain } from 'typechain-types';

describe('HardhatSupplyChainProvider', () => {
  it('should be truthy', async () => {
    const supplyChain: SupplyChain = await HardhatSupplyChainProvider.build();
    expect(!!supplyChain).to.equals(true);
  });
});
