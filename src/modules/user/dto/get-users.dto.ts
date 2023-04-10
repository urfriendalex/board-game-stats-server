import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { User } from '../user.entity';

// TODO: unused for now, will implement later with business logic
class GetUsersDto {
  @ApiProperty({ type: [User] })
  @Expose()
  @Type(() => User)
  users: User[];
}

export default GetUsersDto;
