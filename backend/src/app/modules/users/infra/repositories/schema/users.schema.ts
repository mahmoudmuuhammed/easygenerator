import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Status } from '../../../domain/status';
import { Role } from '../../../domain/role';

@Schema({
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
  toObject: { virtuals: true },
  versionKey: false,
})
export class User {
  @Prop({ type: Types.ObjectId, auto: true })
  id?: string; // Optional as it will be auto created, no need to create from outside.

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  // By default, will not return password for security purpose, we can explicitly return it.
  @Prop({ required: true, select: false })
  password!: string;

  @Prop({ type: String, enum: Status })
  status!: Status;

  @Prop({ type: String, enum: Role })
  role!: Role;

  @Prop({ type: String, required: true })
  created_at!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
