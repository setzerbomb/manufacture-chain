import PostProcessingController from '@modules/supply-chain/infra/express/controllers/PostProcessingController';
import { Router } from 'express';

const postProcessingRouter = Router();

postProcessingRouter.get('/:id', PostProcessingController.get);

postProcessingRouter.post('/:id', PostProcessingController.create);

export default postProcessingRouter;
