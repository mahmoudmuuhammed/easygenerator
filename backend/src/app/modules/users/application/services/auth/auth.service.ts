import { LoginDto, SignupDto } from './dto/auth.dto';

export interface AuthService {
  login(input: LoginDto): Promise<{ oauth_token: string }>;
  signup(input: SignupDto): Promise<{ oauth_token: string }>;
}
