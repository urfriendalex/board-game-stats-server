import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { CustomLoggerService } from '../../infra/logger/logger.service';
import { UserService } from '../user/user.service';
import { LogicException } from '../../infra/exceptions/logic-exception';
import { User } from '../user/user.entity';
import { AuthConfig } from 'src/config/interface';
import { AuthTokenDto } from './dto';
import { Exceptions } from 'src/infra/exceptions/enum/exceptions.enum';

@Injectable()
export class AuthService {
  private authConfig: AuthConfig;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logger: CustomLoggerService,
    private readonly configService: ConfigService,
  ) {
    this.authConfig = this.configService.get<AuthConfig>('auth');
  }

  private async _validatePassword(
    password: string,
    receivedPassword: string,
  ): Promise<void> {
    const isMatch = await compare(receivedPassword, password);
    if (!isMatch) {
      throw new LogicException(Exceptions.WRONG_CREDENTIALS);
    }
  }

  private async _getJWTokens(user: User): Promise<AuthTokenDto> {
    const accessToken = await this._generateAccessToken(user);

    return {
      user,
      accessToken,
    };
  }

  private async _generateAccessToken(user: User): Promise<string> {
    return this.jwtService.sign(
      { id: user.id },
      { expiresIn: this.authConfig.accessTokenExpirationTime },
    );
  }

  async register(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);

    if (user) {
      throw new LogicException(Exceptions.EMAIL_ALREADY_EXISTS);
    }

    const createdUser = await this.userService.createUser({
      email,
      password: await hash(password, 10),
    });
    return createdUser;
  }

  async login(email: string, password: string): Promise<AuthTokenDto> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new LogicException(Exceptions.USER_NOT_FOUND);
    }
    await this._validatePassword(user.password, password);

    return this._getJWTokens(user);
  }
}
