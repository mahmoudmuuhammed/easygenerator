import { Connection } from 'mongoose';
import { UserRepo } from '../../application/repositories/users.repository';
import {
  CreateOnePayload,
  createOnePayloadSchema,
  FindOnePayload,
  findOnePayloadSchema,
} from '../../application/repositories/payloads/usersPayload';
import { User } from './schema/users.schema';
import { UserMapper } from './mapper/users.mapper';
import { Validator } from 'src/lib/validator';

export class UserRepoImpl implements UserRepo {
  private readonly schemaName: string = 'User';

  constructor(
    private connection: Connection,
    private userMapper: UserMapper,
  ) {}

  async findOne(input: FindOnePayload) {
    const { id, email, with_password } = Validator.validate(
      findOnePayloadSchema,
      input,
    );

    let filter = {};

    if (id) filter['_id'] = id;

    if (email) filter['email'] = email;

    let query = this.connection.model<User>(this.schemaName).findOne(filter);

    if (with_password) {
      query.select('+password');
    }

    const user = await query.exec();

    if (!user) return null;

    return this.userMapper.map(user.toJSON());
  }

  async createOne(input: CreateOnePayload) {
    const { name, email, password, status, role, created_at } =
      Validator.validate(createOnePayloadSchema, input);

    const record = await this.connection.model<User>(this.schemaName).create({
      name: name,
      email,
      password,
      status,
      created_at,
      role,
    });

    return this.userMapper.map(record.toJSON());
  }
}
