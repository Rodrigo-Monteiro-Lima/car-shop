import ICar from './ICar';

export default interface ICarModel {
  create(car: ICar): Promise<ICar>;
  getAll(): Promise<ICar[]>;
  getById(i: string): Promise<ICar | null>;
  update(i: string, c: ICar): Promise<ICar | null>;
}