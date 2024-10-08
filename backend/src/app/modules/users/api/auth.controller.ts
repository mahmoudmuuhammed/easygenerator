import { Body, Controller, Inject, Post } from '@nestjs/common';
import { userSymbol } from '../users.symbol';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AuthService } from '../application/services/auth/auth.service';
import { ResponseBuilder } from 'src/common/helpers/response';
import {
  LoginHandlerDto,
  loginHandlerSchema,
  SignupHandlerDto,
  signupHandlerSchema,
} from './payloads/auth.dto';
import { Validator } from 'src/lib/validator';

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
  async signup(@Body() input: SignupHandlerDto) {
    const draft = Validator.validate(signupHandlerSchema, input);

    const data = await this.authService.signup({
      connection: this.connection,
      draft,
    });

    const response = ResponseBuilder.json(data);

    return response;
  }

  @Post('login')
  async login(@Body() input: LoginHandlerDto) {
    const draft = Validator.validate(loginHandlerSchema, input);

    const data = await this.authService.login({
      connection: this.connection,
      draft,
    });

    const response = ResponseBuilder.json(data);

    return response;
  }
}
