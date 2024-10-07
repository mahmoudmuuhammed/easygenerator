import * as bcrypt from 'bcrypt';

export class Hashing {
  public static async encrypt(password: string) {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, 12);
  }

  public static async compare(password: string, hashing: string) {
    return await bcrypt.compare(password, hashing);
  }
}
