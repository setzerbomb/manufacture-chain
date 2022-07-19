import { Router } from 'express';

import Loader, { ILoader } from '../model/services/Loader';
import PartService, { IPartService } from '../model/services/PartService';

const routes = Router();

let partServiceInstance: IPartService;

Promise.resolve(Loader()).then(({ partService }: ILoader) => {
  partServiceInstance = partService;
});

routes.get('/', async (req, res) => {
  await partServiceInstance.create({
    ownership: '0xaD3eC8bbb78E694Ab813e8Ca09B3A26Fde09d827',
    designedBy: '0xaD3eC8bbb78E694Ab813e8Ca09B3A26Fde09d827',
    manufacturedBy: '0xaD3eC8bbb78E694Ab813e8Ca09B3A26Fde09d827',
    process: 'AFTER',
    manufacturingDate: new Date().getMilliseconds().toString(),
    processParameters: 'params',
  });

  return res.json(await partServiceInstance.get(0));
});

export default routes;
