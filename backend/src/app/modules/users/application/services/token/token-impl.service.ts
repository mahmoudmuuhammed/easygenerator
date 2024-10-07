import { Injectable } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenServiceImpl implements TokenService {
  constructor(private jwtService: JwtService) {}

  async generate(tenantId: string, role: string) {
    return await this.jwtService.signAsync(
      { role },
      {
        secret: '123',
        subject: tenantId,
        expiresIn: '1d',
        algorithm: 'HS256',
      },
    );
  }

  async verify(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
}
