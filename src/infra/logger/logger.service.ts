import { Injectable, LoggerService } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private errorLevel: LoggerService;
  private infoLevel: LoggerService;
  private warnLevel: LoggerService;

  constructor() {
    this.errorLevel = WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike(),
          ),
        }),
      ],
    });
    this.infoLevel = WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike('B2T', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    });
    this.warnLevel = WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike('B2T', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    });
  }

  error(message: string | unknown): void {
    this.errorLevel.error(message);
  }

  log(message: string | unknown): void {
    this.infoLevel.log(message);
  }

  warn(message: string | unknown): void {
    this.warnLevel.warn(message);
  }
}
