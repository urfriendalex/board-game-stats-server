import { CreateUserDto, UpdateUserDto } from '../dto';
import { User } from '../user.entity';

interface IUserRepository {
  createAndSave(user: CreateUserDto): Promise<User>;
  getById(id: string): Promise<User>;
  getAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
  update(id: string, user: UpdateUserDto);
}

export default IUserRepository;
