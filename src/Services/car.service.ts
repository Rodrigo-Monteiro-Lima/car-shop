import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import ICarModel from '../Interfaces/ICarModel';
import ICarService from '../Interfaces/ICarService';
import ICarValidation from '../Interfaces/ICarValidation';
import UnprocessableContentExeception from '../errors/UnprocessableContentExeception';
import NotFoundException from '../errors/NotFoundException';

export default class CarService implements ICarService {
  #model: ICarModel;
  #validation: ICarValidation;

  constructor(model: ICarModel, validation: ICarValidation) {
    this.#model = model;
    this.#validation = validation;
  }

  #createCarDomain = (car: ICar): Car => new Car(car);

  create = async (car: ICar) => {
    this.#validation.validateNewCar(car);
    const newCar = await this.#model.create(car);
    return this.#createCarDomain(newCar);
  };

  getAll = async () => {
    const cars = await this.#model.getAll();
    return cars.map((car) => this.#createCarDomain(car));
  };

  getById = async (_id: string) => {
    if (!isValidObjectId(_id)) throw new UnprocessableContentExeception('Invalid mongo id');
    const car = await this.#model.getById(_id);
    if (!car) throw new NotFoundException('Car not found');
    return this.#createCarDomain(car);
  };
}