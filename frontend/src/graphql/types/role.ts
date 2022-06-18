export interface Role {
  id: string;
  role: RoleType;
}

export enum RoleType {
  ADMIN = "ADMIN",
  CITIZEN = "CITIZEN",
  GUARD = "GUARD",
}
