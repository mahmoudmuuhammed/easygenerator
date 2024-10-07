import { Connection } from 'mongoose';
import { UserRepo } from './users.repository';

export interface UserRepoFactory {
  create(connection: Connection): UserRepo;
}
