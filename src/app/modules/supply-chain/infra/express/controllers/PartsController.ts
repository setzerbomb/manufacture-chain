import PartService from '@modules/supply-chain/model/services/PartService';
import { Request, Response, NextFunction } from 'express';

import { container } from 'tsyringe';

const PartsController = () => {
  const self = {
    get: async (req: Request, res: Response) => {
      const partService = container.resolve(PartService);

      await partService.create({
        ownership: '0xaD3eC8bbb78E694Ab813e8Ca09B3A26Fde09d827',
        designedBy: '0xaD3eC8bbb78E694Ab813e8Ca09B3A26Fde09d827',
        manufacturedBy: '0xaD3eC8bbb78E694Ab813e8Ca09B3A26Fde09d827',
        process: 'AFTER',
        manufacturingDate: new Date().getMilliseconds().toString(),
        processParameters: 'params',
      });

      return res.json(await partService.get(0));
    },
  };

  return self;
};

export default PartsController();
