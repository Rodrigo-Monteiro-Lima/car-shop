import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from './IMotorcycle';

export default interface IMotorcycleService {
  create(m: IMotorcycle): Promise<Motorcycle | null>;
  getAll(): Promise<(Motorcycle | null)[]>;
  getById(i: string): Promise<Motorcycle | null>
  update(i: string, m: IMotorcycle): Promise<Motorcycle | null>
  delete(i: string): Promise<void>;
}