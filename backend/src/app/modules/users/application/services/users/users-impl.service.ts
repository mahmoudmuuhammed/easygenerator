import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from './users.service';
import { GetUserDto, getUserPayloadSchema } from './dto/user.dto';
import { Validator } from 'src/lib/validator';
import { userSymbol } from '../../../users.symbol';
import { UserRepoFactory } from '../../repositories/users-factory.repository';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject(userSymbol.userRepoFactory)
    private readonly userRepoFactory: UserRepoFactory,
  ) {}

  async getUser(input: GetUserDto) {
    const { connection, userId } = Validator.validate(
      getUserPayloadSchema,
      input,
    );

    const userRepo = this.userRepoFactory.create(connection);

    const user = await userRepo.findOne({ id: userId });

    if (!user) throw new NotFoundException('User not found with this id');

    return user;
  }
}
