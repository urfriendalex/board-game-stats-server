import { Exceptions } from './enum/exceptions.enum';

export class LogicException extends Error {
  constructor(public error: Exceptions) {
    super(error);
  }
}
