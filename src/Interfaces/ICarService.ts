import Car from '../Domains/Car';
import ICar from './ICar';

export default interface ICarService {
  create(car: ICar): Promise<Car | null>;
  getAll(): Promise<Car[]>;
  getById(i: string): Promise<Car | null>;
  update(i: string, c: ICar): Promise<Car>;
}