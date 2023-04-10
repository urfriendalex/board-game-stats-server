import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(6)
  password: string;

  @ApiProperty()
  @IsString()
  email: string;
}

export default CreateUserDto;
