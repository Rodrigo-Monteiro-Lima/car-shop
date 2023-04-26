import IMotorcycle from './IMotorcycle';

export default interface IMotorcycleValidation {
  validateNewMotorcycle(motorcycle: IMotorcycle): void;
}