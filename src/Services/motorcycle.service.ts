import IMotorcycleModel from '../Interfaces/IMotorcycleModel';
import IMotorcycle from '../Interfaces/IMotorcycle';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycleValidation from '../Interfaces/IMotorcycleValidation';
import IMotorcycleService from '../Interfaces/IMotorcycleService';

export default class MotorcycleService implements IMotorcycleService {
  #model: IMotorcycleModel;
  #validation: IMotorcycleValidation;

  constructor(model: IMotorcycleModel, validation: IMotorcycleValidation) {
    this.#model = model;
    this.#validation = validation;
  }
  getAll(): Promise<(Motorcycle | null)[]> {
    throw new Error('tbd');
  }
  getById(i: string): Promise<Motorcycle | null> {
    console.log(i);
    throw new Error('Method not implemented.');
  }
  update(i: string, m: IMotorcycle): Promise<Motorcycle | null> {
    console.log(i, m);
    throw new Error('Method not implemented.');
  }

  #createMotorcycleDomain = (motorcycle: IMotorcycle): Motorcycle => new Motorcycle(motorcycle);

  create = async (motorcycle: IMotorcycle) => {
    this.#validation.validateNewMotorcycle(motorcycle);
    const newMotorcycle = await this.#model.create(motorcycle);
    return this.#createMotorcycleDomain(newMotorcycle);
  };
}