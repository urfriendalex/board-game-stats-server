import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateGameDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export default CreateGameDto;
