import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGameDto, UpdateGameDto } from './dto';
import { Game } from './game.entity';
import { IGameRepository } from './interfaces';

@Injectable()
export class GameRepository implements IGameRepository {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  async getAll(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  async createAndSave(creationAttrs: CreateGameDto): Promise<Game> {
    const createdUser = await this.gamesRepository.create(creationAttrs);
    return this.gamesRepository.save(createdUser);
  }

  async getById(id: string): Promise<Game> {
    return this.gamesRepository
      .createQueryBuilder('game')
      .where('game.id = :id', { id })
      .getOne();
  }

  async update(id: string, user: UpdateGameDto): Promise<void> {
    await this.gamesRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.gamesRepository.delete(id);
  }
}
