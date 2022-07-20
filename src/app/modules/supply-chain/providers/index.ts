import { container, Lifecycle } from 'tsyringe';
import { SupplyChain } from 'typechain-types';
import HardhatSupplyChainProvider from './SupplyChainProvider/implementations/HardhatSupplyChainProvider';

Promise.resolve(HardhatSupplyChainProvider.build()).then(supplyChain => {
  container.register<SupplyChain>('SupplyChainProvider', {
    useValue: supplyChain,
  });
});
