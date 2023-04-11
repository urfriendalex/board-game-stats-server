import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.entity';
import { Expose, Type } from 'class-transformer';

class AuthTokenDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @Expose()
  @ApiProperty()
  @Type(() => User)
  user?: User;
}

export default AuthTokenDto;
