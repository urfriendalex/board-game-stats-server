import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UpdateGameDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}

export default UpdateGameDto;
