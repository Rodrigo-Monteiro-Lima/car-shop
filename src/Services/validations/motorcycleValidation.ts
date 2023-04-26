import IIndexable from '../../Interfaces/IIndexable';
import IMotorcycle from '../../Interfaces/IMotorcycle';
import IMotorcycleValidation from '../../Interfaces/IMotorcycleValidation';
import BadRequestException from '../../errors/BadResquestException';

export default class MotorcycleValidation implements IMotorcycleValidation {
  #validateString = (value: string, obj: object) => {
    const string = ['color', 'model', 'category'];
    if (string.includes(value) && typeof (obj as IIndexable)[value] !== 'string') {
      throw new BadRequestException(`${value} must be a string`);
    }
  };

  #validateNumber = (value: string, obj: object) => {
    const number = ['buyValue', 'engineCapacity', 'year'];
    if (number.includes(value) && typeof (obj as IIndexable)[value] !== 'number') {
      throw new BadRequestException(`${value} must be a number`);
    }
  };
  validateNewMotorcycle(motorcycle: IMotorcycle): void {
    const attributes = ['buyValue', 'category', 'color', 'engineCapacity', 'model', 'year'];
    attributes.forEach((att) => {
      if (!(motorcycle as IIndexable)[att]) throw new BadRequestException(`${att} is required`);
      this.#validateString(att, motorcycle);
      this.#validateNumber(att, motorcycle);
      if ((motorcycle as IIndexable).status 
      && typeof (motorcycle as IIndexable).status !== 'boolean') {
        throw new BadRequestException('status must be a boolean');
      }
    });
  }
}