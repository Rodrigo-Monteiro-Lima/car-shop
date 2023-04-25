import { Request, Response } from 'express';
import ICarService from '../Interfaces/ICarService';
import ICar from '../Interfaces/ICar';
import StatusCodes from '../Utils/statusCode';

export default class CarController {
  #service: ICarService;

  constructor(service: ICarService) {
    this.#service = service;
  }

  create = async (req: Request<object, object, ICar>, res: Response) => {
    const { body } = req;
    const car = await this.#service.create(body);
    return res.status(StatusCodes.CREATED).json(car);
  };
}