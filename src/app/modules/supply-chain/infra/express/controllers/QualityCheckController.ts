import QualityCheck from '@modules/supply-chain/model/entities/QualityCheck';
import QualityCheckService from '@modules/supply-chain/model/services/QualityCheckService';

import { Request, Response, NextFunction } from 'express';

import { container } from 'tsyringe';

const QualityCheckController = () => {
  const self = {
    get: async (req: Request, res: Response) => {
      const qualityCheckService = container.resolve(QualityCheckService);

      const id = Number(req.params?.id);

      return res.json(await qualityCheckService.get(id));
    },
    create: async (req: Request, res: Response) => {
      const qualityCheckService = container.resolve(QualityCheckService);

      const id = Number(req.params?.id);
      const qualityCheck: QualityCheck = req.body;

      await qualityCheckService.create(id, qualityCheck);

      return res.status(201).send();
    },
  };

  return self;
};

export default QualityCheckController();
