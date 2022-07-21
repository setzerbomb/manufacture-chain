import PartsController from '@modules/supply-chain/infra/express/controllers/PartsController';
import { Router } from 'express';

const partsRouter = Router();

partsRouter.get('/:id', PartsController.get);

partsRouter.post('/', PartsController.create);

partsRouter.patch('/:id', PartsController.modifyOwnership);

partsRouter.get('/:id/history', PartsController.history);

export default partsRouter;
