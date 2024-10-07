import { BadRequestException } from '@nestjs/common';
import { Schema } from 'zod';

export class Validator {
  public static validate<T>(schema: Schema<T>, input: T): T {
    const result = schema.safeParse(input);
    if (!result.success) {
      throw new BadRequestException({
        message: 'Validation Failed.',
        errors: result.error,
      });
    }

    return result.data;
  }
}
