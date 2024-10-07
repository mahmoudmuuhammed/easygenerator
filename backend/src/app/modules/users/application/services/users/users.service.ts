import { User } from '../../../domain/users';
import { GetUserDto } from './dto/user.dto';

export interface UserService {
  getUser(input: GetUserDto): Promise<User>;
}
