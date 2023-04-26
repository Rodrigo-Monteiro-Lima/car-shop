import { NextFunction, Request, RequestHandler, Response } from 'express';
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

  getAll: RequestHandler = async (_req, res, next) => {
    try {
      const motorcycles = await this.#service.getAll();
      return res.status(StatusCodes.OK).json(motorcycles);      
    } catch (error) {
      return next(error);
    }
  };

  getById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const motorcycle = await this.#service.getById(id);
      return res.status(StatusCodes.OK).json(motorcycle);      
    } catch (error) {
      return next(error);
    }
  };

  update = async (
    req: Request<{ id: string }, 
    object, IMotorcycle>, 
    res: Response, 
    next: NextFunction,
  ) => {
    try {
      const { body, params: { id } } = req;
      const motorcycle = await this.#service.update(id, body);
      return res.status(StatusCodes.OK).json(motorcycle);      
    } catch (error) {
      return next(error);
    }
  };
}