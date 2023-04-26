import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM';
import IMotorcycle from '../Interfaces/IMotorcycle';
import IMotorcycleModel from '../Interfaces/IMotorcycleModel';

export default class MotorcycleODM extends AbstractODM<IMotorcycle> implements IMotorcycleModel {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    }, { versionKey: false });
    super(schema, 'Motorcycle');
  }
}