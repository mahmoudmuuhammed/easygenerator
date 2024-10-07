import { Role } from './role';
import { Status } from './status';

export interface UserInput {
  id: string;
  name: string;
  email: string;
  password: string;
  status: Status;
  role: Role;
  created_at: string;
}

export class User {
  id!: string;
  name!: string;
  email!: string;
  password?: string;
  status!: Status;
  role!: Role;
  created_at!: string;

  constructor({
    id,
    name,
    email,
    password,
    role,
    status,
    created_at,
  }: UserInput) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.status = status;
    this.created_at = created_at;

    if (password) this.password = password;
  }
}
