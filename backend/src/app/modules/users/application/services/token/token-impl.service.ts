import { Injectable } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenServiceImpl implements TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generate(tenantId: string, role: string) {
    const secret = this.configService.get<string>('jwt.secret') as string;
    const expiration = this.configService.get<string>('jwt.secret');

    return await this.jwtService.signAsync(
      { role },
      {
        secret,
        subject: tenantId,
        expiresIn: expiration,
        algorithm: 'HS256',
      },
    );
  }

  async verify(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
}
