import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../Utils/statusCode';
import IMotorcycleService from '../Interfaces/IMotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotorcycleController {
  #service: IMotorcycleService;

  constructor(service: IMotorcycleService) {
    this.#service = service;
  }

  create = async (req: Request<object, object, IMotorcycle>, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const motorcycle = await this.#service.create(body);
      return res.status(StatusCodes.CREATED).json(motorcycle);
    } catch (error) {
      return next(error);
    }
  };
}