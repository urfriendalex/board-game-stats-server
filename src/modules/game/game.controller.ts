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
import { GameService } from './game.service';
import { Game } from './game.entity';
import { UpdateGameDto, CreateGameDto } from './dto';

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  @TypeOrmClassSerializerInterceptor(Game)
  @ApiResponse({
    status: 200,
    type: Game,
    isArray: true,
  })
  async getMany(): Promise<Game[]> {
    return this.gameService.getGames();
  }

  @Get(':id')
  @TypeOrmClassSerializerInterceptor(Game)
  @ApiResponse({
    status: 200,
    type: Game,
  })
  async getOne(@Param('id') id: string): Promise<Game> {
    return this.gameService.getGameById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: Game,
  })
  async createOne(
    @Param('id') id: string,
    @Body() createDto: CreateGameDto,
  ): Promise<Game> {
    return this.gameService.createGame(createDto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: Game,
  })
  @ApiParam({ name: 'id', type: String })
  async updateOne(
    @Param('id') id: string,
    @Body() updateDto: UpdateGameDto,
  ): Promise<Game> {
    return this.gameService.updateGame(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: Game,
  })
  @ApiParam({ name: 'id', type: String })
  async deleteOne(@Param('id') id: string): Promise<Game> {
    return this.gameService.deleteGame(id);
  }
}
