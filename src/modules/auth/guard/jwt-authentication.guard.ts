import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LogicException } from 'src/infra/exceptions/logic-exception';
import { Exceptions } from 'src/infra/exceptions/enum/exceptions.enum';

@Injectable()
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<User>(err: LogicException, user: User) {
    if (err || !user) {
      throw new LogicException(Exceptions.UNAUTHORIZED);
    }
    return user;
  }
}
