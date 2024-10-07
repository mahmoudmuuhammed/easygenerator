import { Module } from '@nestjs/common';
import { AuthController } from './api/auth.controller';
import { UsersController } from './api/users.controller';
import { AuthServiceImpl } from './application/services/auth/auth-impl.service';
import { userSymbol } from './users.symbol';
import { TokenServiceImpl } from './application/services/token/token-impl.service';
import { UserServiceImpl } from './application/services/users/users-impl.service';
import { UserMapperImpl } from './infra/repositories/mapper/users-impl.mapper';
import { UserRepoFactoryImpl } from './infra/repositories/usersRepoFactoryImpl';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infra/repositories/schema/users.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController, UsersController],
  providers: [
    {
      provide: userSymbol.authService,
      useClass: AuthServiceImpl,
    },
    {
      provide: userSymbol.tokenService,
      useClass: TokenServiceImpl,
    },
    {
      provide: userSymbol.userService,
      useClass: UserServiceImpl,
    },
    {
      provide: userSymbol.userMapper,
      useClass: UserMapperImpl,
    },
    {
      provide: userSymbol.userRepoFactory,
      useClass: UserRepoFactoryImpl,
    },
    JwtService,
  ],
})
export class UsersModule {}
