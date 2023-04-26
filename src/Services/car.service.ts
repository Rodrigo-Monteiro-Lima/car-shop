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

  #validateId = (_id: string) => {
    if (!isValidObjectId(_id)) throw new UnprocessableContentExeception('Invalid mongo id');
  };

  #validateCar = (car: ICar | null) => {
    if (!car) throw new NotFoundException('Car not found');
  };

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
    this.#validateId(_id);
    const car = await this.#model.getById(_id);
    this.#validateCar(car);
    return this.#createCarDomain(car as ICar);
  };

  update = async (_id: string, car: ICar) => {
    this.#validateId(_id);
    this.#validation.validateNewCar(car);
    const updatedCar = await this.#model.update(_id, car);
    this.#validateCar(updatedCar);
    return this.#createCarDomain(updatedCar as ICar);
  };

  delete = async (_id: string) => {
    this.#validateId(_id);
    const deletedCar = await this.#model.delete(_id);
    this.#validateCar(deletedCar);
  };
}