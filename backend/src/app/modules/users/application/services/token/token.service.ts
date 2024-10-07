export interface TokenService {
  generate(tenantId: string, role: string): Promise<string>;
  verify(token: string): Promise<Record<string, string>>;
}
