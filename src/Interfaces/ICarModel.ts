import ICar from './ICar';

export default interface ICarModel {
  create(car: ICar): Promise<ICar>;
  getAll(): Promise<ICar[]>;
  getById(i: string): Promise<ICar | null>;
}