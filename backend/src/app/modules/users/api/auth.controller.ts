import { Body, Controller, Inject, Post } from '@nestjs/common';
import { userSymbol } from '../users.symbol';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AuthService } from '../application/services/auth/auth.service';
import { ResponseBuilder } from 'src/common/helpers/response';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    @InjectConnection() private connection: Connection,
    @Inject(userSymbol.authService)
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() input: any) {
    const data = await this.authService.signup({
      connection: this.connection,
      draft: input,
    });

    const response = ResponseBuilder.json(data);

    return response;
  }

  @Post('login')
  async login(@Body() input: any) {
    const data = await this.authService.login({
      connection: this.connection,
      draft: input,
    });

    const response = ResponseBuilder.json(data);

    return response;
  }
}
