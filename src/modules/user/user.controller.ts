import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TypeOrmClassSerializerInterceptor } from 'src/infra/serializers/typeorm.serializer';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @TypeOrmClassSerializerInterceptor(User)
  @ApiResponse({
    status: 200,
    type: User,
    isArray: true,
  })
  async getMany(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @TypeOrmClassSerializerInterceptor(User)
  @ApiResponse({
    status: 200,
    type: User,
  })
  async getOne(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: User,
  })
  async createOne(
    @Param('id') id: string,
    @Body() createDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createDto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: User,
  })
  @ApiParam({ name: 'id', type: String })
  async updateOne(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: User,
  })
  @ApiParam({ name: 'id', type: String })
  async deleteOne(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
