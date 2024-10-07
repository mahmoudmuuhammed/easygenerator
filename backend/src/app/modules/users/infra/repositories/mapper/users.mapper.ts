import { Mapper } from 'src/common/types/mapper';
import { User as UserSchema } from '../schema/users.schema';
import { User } from '../../../domain/users';

// This mapper take the schema as input, return actual domain as output.
export type UserMapper = Mapper<UserSchema, User>;
