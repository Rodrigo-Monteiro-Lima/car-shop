import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    super(car);
    const { doorsQty, seatsQty } = car;
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
  }
}