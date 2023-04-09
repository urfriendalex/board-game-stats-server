import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

import { LogicException } from '../exceptions/logic-exception';
import { Exceptions } from '../exceptions/regular-exception';
import { CustomLoggerService } from '../logger/logger.service';

@Catch(LogicException)
class LogicExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}
  catch(exception: LogicException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const expInfo = Exceptions[exception.error];
    const status = expInfo.httpStatusCode;
    const message = expInfo.message;
    this.logger.error(message);

    response.status(status).json({
      statusCode: status,
      stringCode: exception.error,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

export default LogicExceptionFilter;
