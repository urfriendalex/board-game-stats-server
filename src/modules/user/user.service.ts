import { Inject, Injectable } from '@nestjs/common';

import { LogicException } from 'src/infra/exceptions/logic-exception';
import { Exceptions } from 'src/infra/exceptions/enum/exceptions.enum';
import { CustomLoggerService } from 'src/infra/logger/logger.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { IUserRepository } from './interfaces';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly logger: CustomLoggerService,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.getAll();
    this.logger.log(`Got users: ${users}`);
    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new LogicException(Exceptions.USER_NOT_FOUND);
    }
    return user;
  }

  async createUser(creationAttrs: CreateUserDto): Promise<User> {
    const user = await this.userRepository.createAndSave(creationAttrs);
    this.logger.log(`Created user: ${user.id}`);
    return user;
  }

  async updateUser(id: string, updateDto: UpdateUserDto): Promise<User> {
    this.logger.log(`Update user: ${id}`);
    await this.userRepository.update(id, updateDto);
    const user = await this.userRepository.getById(id);
    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const userToDelete = await this.userRepository.getById(id);

    if (!userToDelete) {
      throw new LogicException(Exceptions.USER_NOT_FOUND);
    }

    this.logger.log(`Deleted user: ${id}`);
    await this.userRepository.delete(id);

    return userToDelete;
  }
}
