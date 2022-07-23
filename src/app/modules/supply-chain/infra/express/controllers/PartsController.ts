import Part from '@modules/supply-chain/model/entities/Part';
import PartService from '@modules/supply-chain/model/services/PartService';
import { Request, Response, NextFunction } from 'express';

import { container } from 'tsyringe';

const PartsController = () => {
  const self = {
    get: async (req: Request, res: Response) => {
      const partService = container.resolve(PartService);

      const id = Number(req.params?.id);

      return res.json(await partService.get(id));
    },
    create: async (req: Request, res: Response) => {
      const partService = container.resolve(PartService);

      const part: Part = req.body;

      await partService.create(part);

      return res.status(201).send();
    },
    modifyOwnership: async (req: Request, res: Response) => {
      const partService = container.resolve(PartService);

      const id = Number(req.params?.id);
      const { owner } = req.body;

      try {
        await partService.modifyOwnership(id, owner);
      } catch {
        return res
          .status(500)
          .json({ message: 'You are not the resource owner' });
      }

      return res.status(201).send();
    },
    history: async (req: Request, res: Response) => {
      const partService = container.resolve(PartService);

      const id = Number(req.params?.id);

      return res.json(await partService.history(id));
    },
  };

  return self;
};

export default PartsController();
