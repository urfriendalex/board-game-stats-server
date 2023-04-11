import { Exceptions as ExceptionsEnum } from './enum/exceptions.enum';

type RegularExceptionBody = {
  httpStatusCode: number;
  message: string;
};

type RegularExceptionType = {
  [key in ExceptionsEnum]: RegularExceptionBody;
};

export const Exceptions: RegularExceptionType = {
  [ExceptionsEnum.USER_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'User not found',
  },
  [ExceptionsEnum.GAME_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Game not found',
  },
  [ExceptionsEnum.UNAUTHORIZED]: {
    httpStatusCode: 401,
    message: 'Unauthorized',
  },
  [ExceptionsEnum.PASSWORD_NOT_MATCH]: {
    httpStatusCode: 400,
    message: 'Passwords do not match',
  },
  [ExceptionsEnum.WRONG_CREDENTIALS]: {
    httpStatusCode: 400,
    message: 'Wrong credentials',
  },
  [ExceptionsEnum.EMAIL_ALREADY_EXISTS]: {
    httpStatusCode: 400,
    message: 'Email already exists',
  },
};
