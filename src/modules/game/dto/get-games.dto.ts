import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { Game } from '../game.entity';

// TODO: unused for now, will implement later with business logic
class GetGamesDto {
  @ApiProperty({ type: [Game] })
  @Expose()
  @Type(() => Game)
  users: Game[];
}

export default GetGamesDto;
