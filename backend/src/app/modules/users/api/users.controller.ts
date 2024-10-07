import { Controller, Get, Inject, Request, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { userSymbol } from '../users.symbol';
import { UserService } from '../application/services/users/users.service';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ResponseBuilder } from 'src/common/helpers/response';

@Controller({
  version: '1',
})
export class UsersController {
  constructor(
    @InjectConnection() private connection: Connection,
    @Inject(userSymbol.userService)
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req: any) {
    const user = await this.userService.getUser({
      connection: this.connection,
      userId: req.userId,
    });

    const response = ResponseBuilder.json(user);

    return response;
  }
}
