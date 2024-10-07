import { Inject, Injectable } from '@nestjs/common';
import { UserRepoFactory } from '../../application/repositories/users-factory.repository';
import { UserRepo } from '../../application/repositories/users.repository';
import { UserRepoImpl } from './usersRepoImpl';
import { Connection } from 'mongoose';
import { userSymbol } from '../../users.symbol';
import { UserMapper } from './mapper/users.mapper';

@Injectable()
export class UserRepoFactoryImpl implements UserRepoFactory {
  constructor(
    @Inject(userSymbol.userMapper) private readonly userMapper: UserMapper,
  ) {}

  create(connection: Connection): UserRepo {
    return new UserRepoImpl(connection, this.userMapper);
  }
}
