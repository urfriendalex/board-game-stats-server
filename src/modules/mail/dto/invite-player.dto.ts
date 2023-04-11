import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class InvitePlayerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;
}

export default InvitePlayerDto;
