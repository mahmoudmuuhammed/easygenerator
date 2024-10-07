import { Connection } from 'mongoose';
import { Schema, SchemaType } from 'src/lib/validator';

export const getUserPayloadSchema = Schema.object({
  connection: Schema.unsafeType<Connection>(),
  userId: Schema.notEmptyString(),
});

// DTO
export type GetUserDto = SchemaType<typeof getUserPayloadSchema>;
