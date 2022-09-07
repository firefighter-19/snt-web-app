import { Role } from "./role";

export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  siteNumber: number;
  createdAt?: Date;
  updatedAt?: Date;
  role: Role[];
}

export interface LoggedUser {
  loginUser: User;
}

export interface RegisterUser {
  registration: User;
}

export interface UserInfo {
  getUser: User;
}
