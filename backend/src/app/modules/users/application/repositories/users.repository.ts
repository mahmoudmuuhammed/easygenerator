import { User } from '../../domain/users';
import { CreateOnePayload, FindOnePayload } from './payloads/usersPayload';

export interface UserRepo {
  findOne(input: FindOnePayload): Promise<User | null>;
  createOne(input: CreateOnePayload): Promise<User>;
}
