import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from 'src/infra/logger/logger.module';
import { GameService } from './game.service';
import { GameRepository } from './game.repository';
import { GameController } from './game.controller';
import { Game } from './game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), LoggerModule],
  controllers: [GameController],
  providers: [GameService, GameRepository],
  exports: [GameService, GameRepository],
})
export class GameModule {}
