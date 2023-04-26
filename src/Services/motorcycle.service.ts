import { isValidObjectId } from 'mongoose';
import IMotorcycleModel from '../Interfaces/IMotorcycleModel';
import IMotorcycle from '../Interfaces/IMotorcycle';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycleValidation from '../Interfaces/IMotorcycleValidation';
import IMotorcycleService from '../Interfaces/IMotorcycleService';
import UnprocessableContentExeception from '../errors/UnprocessableContentExeception';
import NotFoundException from '../errors/NotFoundException';

export default class MotorcycleService implements IMotorcycleService {
  #model: IMotorcycleModel;
  #validation: IMotorcycleValidation;

  constructor(model: IMotorcycleModel, validation: IMotorcycleValidation) {
    this.#model = model;
    this.#validation = validation;
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

  getAll = async () => {
    const motorcycles = await this.#model.getAll();
    return motorcycles.map((motorcycle) => this.#createMotorcycleDomain(motorcycle));
  };

  getById = async (_id: string) => {
    if (!isValidObjectId(_id)) throw new UnprocessableContentExeception('Invalid mongo id');
    const motorcycle = await this.#model.getById(_id);
    if (!motorcycle) throw new NotFoundException('Motorcycle not found');
    return this.#createMotorcycleDomain(motorcycle);
  };
}