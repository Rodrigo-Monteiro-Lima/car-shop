import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(motor: IMotorcycle) {
    super(motor);
    const { category, engineCapacity } = motor;
    this.category = category;
    this.engineCapacity = engineCapacity;
  }
}
