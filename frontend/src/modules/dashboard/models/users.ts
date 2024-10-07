export enum Role {
  ADMIN = "admin",
  STAFF = "staff",
}

export enum Status {
  ACTIVE = "active",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
}
