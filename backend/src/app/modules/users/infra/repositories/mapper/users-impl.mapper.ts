import { Injectable } from '@nestjs/common';
import { UserMapper } from './users.mapper';
import { User } from '../../../domain/users';
import { User as UserSchema } from '../schema/users.schema';

@Injectable()
export class UserMapperImpl implements UserMapper {
  map({
    id,
    name,
    email,
    password,
    created_at,
    role,
    status,
  }: UserSchema): User {
    return new User({
      id: id!,
      name,
      email,
      password,
      created_at: created_at!,
      role,
      status,
    });
  }
}
