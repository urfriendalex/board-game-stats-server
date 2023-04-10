import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

export function TypeOrmClassSerializerInterceptor(dto: unknown) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private obj: any) {}
  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<unknown> {
    return handler.handle().pipe(
      map((data: unknown) => {
        return plainToClass(this.obj, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
