import { Connection } from 'mongoose';
import { Schema, SchemaType } from 'src/lib/validator';

export const loginPayloadSchema = Schema.object({
  connection: Schema.unsafeType<Connection>(),
  draft: Schema.object({
    email: Schema.string().email(),
    password: Schema.notEmptyString(), // We don't need to verify strong password as will verified from database.
  }),
});

export const signupPayloadSchema = Schema.object({
  connection: Schema.unsafeType<Connection>(),
  draft: Schema.object({
    name: Schema.notEmptyString(),
    email: Schema.string().email(),
    password: Schema.string().refine(
      (password) => {
        return /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(password);
      },
      {
        message:
          'Password must be at least 8 characters long, contain at least one uppercase letter and one symbol',
      },
    ),
  }),
});

// DTO
export type LoginDto = SchemaType<typeof loginPayloadSchema>;
export type SignupDto = SchemaType<typeof signupPayloadSchema>;
