import { CreateGameDto, UpdateGameDto } from '../dto';
import { Game } from '../game.entity';

interface IGameRepository {
  createAndSave(user: CreateGameDto): Promise<Game>;
  getById(id: string): Promise<Game>;
  getAll(): Promise<Game[]>;
  delete(id: string): Promise<void>;
  update(id: string, user: UpdateGameDto);
}

export default IGameRepository;
