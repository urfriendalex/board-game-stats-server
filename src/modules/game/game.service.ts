import { Inject, Injectable } from '@nestjs/common';

import { LogicException } from 'src/infra/exceptions/logic-exception';
import { Exceptions } from 'src/infra/exceptions/enum/exceptions.enum';
import { CustomLoggerService } from 'src/infra/logger/logger.service';
import { CreateGameDto, UpdateGameDto } from './dto';
import { Game } from './game.entity';
import { GameRepository } from './game.repository';
import { IGameRepository } from './interfaces';

@Injectable()
export class GameService {
  constructor(
    @Inject(GameRepository)
    private readonly gameRepository: IGameRepository,
    private readonly logger: CustomLoggerService,
  ) {}

  async getGames(): Promise<Game[]> {
    const games = await this.gameRepository.getAll();
    this.logger.log(`Got games: ${games}`);
    return games;
  }

  async getGameById(id: string): Promise<Game> {
    const game = await this.gameRepository.getById(id);
    if (!game) {
      throw new LogicException(Exceptions.GAME_NOT_FOUND);
    }
    return game;
  }

  async createGame(creationAttrs: CreateGameDto): Promise<Game> {
    const game = await this.gameRepository.createAndSave(creationAttrs);
    this.logger.log(`Created game: ${game.id}`);
    return game;
  }

  async updateGame(id: string, updateDto: UpdateGameDto): Promise<Game> {
    this.logger.log(`Update game: ${id}`);
    await this.gameRepository.update(id, updateDto);
    const game = await this.gameRepository.getById(id);
    return game;
  }

  async deleteGame(id: string): Promise<Game> {
    const gameToDelete = await this.gameRepository.getById(id);

    if (!gameToDelete) {
      throw new LogicException(Exceptions.GAME_NOT_FOUND);
    }

    this.logger.log(`Deleted game: ${id}`);
    await this.gameRepository.delete(id);

    return gameToDelete;
  }
}
