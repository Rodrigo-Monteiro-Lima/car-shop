import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import ICarModel from '../Interfaces/ICarModel';
import ICarService from '../Interfaces/ICarService';
import ICarValidation from '../Interfaces/ICarValidation';

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
}