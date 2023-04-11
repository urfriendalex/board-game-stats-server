import { PipeTransform, Injectable } from '@nestjs/common';

import { LogicException } from 'src/infra/exceptions/logic-exception';
import { Exceptions } from 'src/infra/exceptions/enum/exceptions.enum';

@Injectable()
class PasswordMatchValidationPipe implements PipeTransform {
  async transform(value: any) {
    const { password, confirmPassword } = value;

    if (password !== confirmPassword) {
      throw new LogicException(Exceptions.PASSWORD_NOT_MATCH);
    }

    return value;
  }
}

export default PasswordMatchValidationPipe;
