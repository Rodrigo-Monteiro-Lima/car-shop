import IMotorcycle from './IMotorcycle';

export default interface IMotorcycleModel {
  create(car: IMotorcycle): Promise<IMotorcycle>;
  getAll(): Promise<IMotorcycle[]>;
  getById(i: string): Promise<IMotorcycle | null>;
  update(i: string, c: IMotorcycle): Promise<IMotorcycle | null>;
  delete(i: string): Promise<IMotorcycle | null>;
}