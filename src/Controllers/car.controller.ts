import { NextFunction, Request, RequestHandler, Response } from 'express';
import ICarService from '../Interfaces/ICarService';
import ICar from '../Interfaces/ICar';
import StatusCodes from '../Utils/statusCode';

export default class CarController {
  #service: ICarService;

  constructor(service: ICarService) {
    this.#service = service;
  }

  create = async (req: Request<object, object, ICar>, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const car = await this.#service.create(body);
      return res.status(StatusCodes.CREATED).json(car);      
    } catch (error) {
      return next(error);
    }
  };

  getAll: RequestHandler = async (_req, res) => {
    const cars = await this.#service.getAll();
    return res.status(StatusCodes.OK).json(cars);
  };

  getById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const car = await this.#service.getById(id);
      return res.status(StatusCodes.OK).json(car);      
    } catch (error) {
      return next(error);
    }
  };
}