import ICar from '../../Interfaces/ICar';
import ICarValidation from '../../Interfaces/ICarValidation';
import IIndexable from '../../Interfaces/IIndexable';
import BadRequestException from '../../errors/BadResquestException';
// import carSchema from './schemas';

export default class CarValidation implements ICarValidation {
  #validateString = (value: string, obj: object) => {
    const string = ['color', 'model'];
    if (string.includes(value) && typeof (obj as IIndexable)[value] !== 'string') {
      throw new BadRequestException(`${value} must be a string`);
    }
  };

  #validateNumber = (value: string, obj: object) => {
    const number = ['buyValue', 'doorsQty', 'seatsQty', 'year'];
    if (number.includes(value) && typeof (obj as IIndexable)[value] !== 'number') {
      throw new BadRequestException(`${value} must be a number`);
    }
  };

  validateNewCar = (car: ICar) => {
    const attributes = ['buyValue', 'color', 'doorsQty', 'model', 'seatsQty', 'year'];
    attributes.forEach((att) => {
      if (!(car as IIndexable)[att]) throw new BadRequestException(`${att} is required`);
      this.#validateString(att, car);
      this.#validateNumber(att, car);
      if ((car as IIndexable).status && typeof (car as IIndexable).status !== 'boolean') {
        throw new BadRequestException('status must be a boolean');
      }
    });
  };
}