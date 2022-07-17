import fs from 'fs';
import path from 'path';
import { ContractFactory, Wallet, providers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const provider = new providers.JsonRpcProvider(process.env.RPC_SERVER);
  const wallet = new Wallet(process.env.PRIVATE_KEY as any, provider);

  const abi = fs.readFileSync(
    path.join(
      process.env.BUILD_HOME as string,
      '/contracts/dist/supply-chain_sol_MAMSupplyChain.abi',
    ),
    'utf8',
  );
  const bin = fs.readFileSync(
    path.join(
      process.env.BUILD_HOME as string,
      '/contracts/dist/supply-chain_sol_MAMSupplyChain.bin',
    ),
    'utf8',
  );

  const contractFactory = new ContractFactory(abi, bin, wallet);
  console.log('Deploying...');
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
