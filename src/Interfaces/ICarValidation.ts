import ICar from './ICar';

export default interface ICarValidation {
  validateNewCar(car: ICar): void;
}