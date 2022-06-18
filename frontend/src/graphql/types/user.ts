import { Role } from "./role";
import { RefreshToken } from "./token";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  siteNumber: number;
  createdAt?: Date;
  updatedAt?: Date;
  role?: Role[];
  token: RefreshToken;
}
