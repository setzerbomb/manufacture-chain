import QualityCheckController from '@modules/supply-chain/infra/express/controllers/QualityCheckController';
import { Router } from 'express';

const qualityCheckRouter = Router();

qualityCheckRouter.get('/:id', QualityCheckController.get);

qualityCheckRouter.post('/:id', QualityCheckController.create);

export default qualityCheckRouter;
