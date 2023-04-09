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
  [ExceptionsEnum.UNAUTHORIZED]: {
    httpStatusCode: 401,
    message: 'Unauthorized',
  },
};
