import { Schema, SchemaType } from 'src/lib/validator';
import { Status } from '../../../domain/status';
import { Role } from '../../../domain/role';

export const findOnePayloadSchema = Schema.object({
  id: Schema.notEmptyString().optional(),
  email: Schema.string().email().optional(),
  with_password: Schema.boolean().optional(),
});

export const createOnePayloadSchema = Schema.object({
  name: Schema.notEmptyString(),
  email: Schema.string().email(),
  password: Schema.notEmptyString(),
  status: Schema.enum(Status),
  role: Schema.enum(Role),
  created_at: Schema.string().datetime(),
});

export type FindOnePayload = SchemaType<typeof findOnePayloadSchema>;
export type CreateOnePayload = SchemaType<typeof createOnePayloadSchema>;
