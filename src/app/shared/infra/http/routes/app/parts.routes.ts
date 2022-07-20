import PartsController from '@modules/supply-chain/infra/express/controllers/PartsController';
import { Router } from 'express';

const partsRouter = Router();

partsRouter.get('/', PartsController.get);

export default partsRouter;
