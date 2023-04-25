import HttpException from './HttpException';
import StatusCodes from '../Utils/statusCode';

export default class UnprocessableContentExeception extends HttpException {
  constructor(message: string) {
    super(StatusCodes.UNPROCESSABLE_CONTENT, message);
  }
}