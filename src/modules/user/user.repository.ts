import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from './dto';
import { IUserRepository } from './interfaces';
import { User } from './user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createAndSave(creationAttrs: CreateUserDto): Promise<User> {
    const createdUser = await this.usersRepository.create(creationAttrs);
    return this.usersRepository.save(createdUser);
  }

  async getById(id: string): Promise<User> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async update(id: string, user: UpdateUserDto): Promise<void> {
    await this.usersRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
