import {
  Model,
  models,
  Schema,
  model,
} from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  getAll = async (): Promise<T[]> => this.model.find();

  getById = async (id: string): Promise<T | null> => this.model.findById(id);
}

export default AbstractODM;