import HttpException from './HttpException';
import StatusCodes from '../Utils/statusCode';

export default class BadRequestException extends HttpException {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}