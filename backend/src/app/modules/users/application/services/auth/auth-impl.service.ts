import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto,
  loginPayloadSchema,
  SignupDto,
  signupPayloadSchema,
} from './dto/auth.dto';
import { Validator } from 'src/lib/validator';
import { userSymbol } from '../../../users.symbol';
import { UserRepoFactory } from '../../repositories/users-factory.repository';
import { Hashing } from 'src/common/helpers/hashing';
import { TokenService } from '../token/token.service';
import { Role } from '../../../domain/role';
import { Status } from '../../../domain/status';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @Inject(userSymbol.userRepoFactory)
    private readonly userRepoFactory: UserRepoFactory,
    @Inject(userSymbol.tokenService)
    private readonly tokenService: TokenService,
  ) {}

  async login(input: LoginDto) {
    const { connection, draft } = Validator.validate(loginPayloadSchema, input);

    const userRepo = this.userRepoFactory.create(connection);

    const user = await userRepo.findOne({
      email: draft.email,
      with_password: true,
    });

    if (!user) throw new BadRequestException('Invalid account credentials.');

    const verifyPassword = await Hashing.compare(
      draft.password,
      user.password!,
    );

    if (!verifyPassword)
      throw new BadRequestException('Invalid account credentials.');

    const token = await this.tokenService.generate(user.id, user.role);

    return { oauth_token: token };
  }

  async signup(input: SignupDto) {
    const { connection, draft } = Validator.validate(
      signupPayloadSchema,
      input,
    );

    const userRepo = this.userRepoFactory.create(connection);

    const user = await userRepo.findOne({ email: draft.email });

    if (user) throw new BadRequestException('Email already registered before.');

    const passwordHash = await Hashing.encrypt(draft.password);

    const record = await userRepo.createOne({
      ...draft,
      password: passwordHash,
      role: Role.ADMIN,
      status: Status.ACTIVE,
      created_at: new Date(Date.now()).toISOString(),
    });

    const token = await this.tokenService.generate(record.id, record.role);

    return { oauth_token: token };
  }
}
