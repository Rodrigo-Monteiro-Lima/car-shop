import HttpException from './HttpException';
import StatusCodes from '../Utils/statusCode';

export default class NotFoundException extends HttpException {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, message);
  }
}