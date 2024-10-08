import { Schema, SchemaType } from 'src/lib/validator';

export const signupHandlerSchema = Schema.object({
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
});

export const loginHandlerSchema = Schema.object({
  email: Schema.string().email(),
  password: Schema.notEmptyString(),
});

// DTO
export type LoginHandlerDto = SchemaType<typeof loginHandlerSchema>;
export type SignupHandlerDto = SchemaType<typeof signupHandlerSchema>;
