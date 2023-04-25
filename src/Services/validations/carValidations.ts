import ICar from '../../Interfaces/ICar';
import ICarValidation from '../../Interfaces/ICarValidation';
import BadRequestException from '../../errors/BadResquestException';
import carSchema from './schemas';

export default class CarValidation implements ICarValidation {
  validateNewCar = (car: ICar) => {
    const { error } = carSchema.validate(car);
    if (error) throw new BadRequestException(error.message);
  };
}