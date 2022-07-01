
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum RoleType {
    ADMIN = "ADMIN",
    CITIZEN = "CITIZEN",
    GUARD = "GUARD"
}

export class RefreshTokenInput {
    userId: string;
    refreshToken: string;
}

export class LoginUser {
    email: string;
    password: string;
}

export class CreateRoleInput {
    role: RoleType;
}

export class CreateUserInput {
    email: string;
    password: string;
    name: string;
    lastName: string;
    siteNumber: number;
}

export class RoleInput {
    userId: string;
    roleId: string;
}

export class UpdateUserInput {
    id: string;
    email?: Nullable<string>;
    name?: Nullable<string>;
    lastName?: Nullable<string>;
    siteNumber?: Nullable<number>;
}

export class DeleteUserInput {
    ids: string[];
}

export abstract class IMutation {
    abstract loginUser(userData: LoginUser): User | Promise<User>;

    abstract registration(createUser: CreateUserInput): User | Promise<User>;

    abstract createRole(createRole: CreateRoleInput): Nullable<Role> | Promise<Nullable<Role>>;

    abstract updateUser(updateUser: UpdateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUsers(deleteUser: string[]): Nullable<Nullable<string>[]> | Promise<Nullable<Nullable<string>[]>>;

    abstract addRole(addRole: RoleInput): Nullable<User> | Promise<Nullable<User>>;

    abstract removeRole(removeRole: RoleInput): Nullable<User> | Promise<Nullable<User>>;
}

export class Token {
    accessToken: string;
    refreshToken: string;
}

export class TokenData {
    userId: string;
    accessToken: string;
    refreshToken: string;
}

export class ActivationLink {
    email: string;
    link: string;
}

export abstract class IQuery {
    abstract getData(): string | Promise<string>;

    abstract getRole(getRole: string): Nullable<Role> | Promise<Nullable<Role>>;

    abstract getUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Role {
    id: string;
    role: RoleType;
}

export class User {
    id: string;
    email: string;
    password: string;
    name: string;
    lastName: string;
    siteNumber: number;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    role?: Nullable<Nullable<Role>[]>;
    token: TokenData;
}

type Nullable<T> = T | null;
