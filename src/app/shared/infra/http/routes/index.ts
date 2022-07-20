import { Router } from 'express';

import partsRouter from './app/parts.routes';

const routes = Router();

routes.use('/parts', partsRouter);

export default routes;
