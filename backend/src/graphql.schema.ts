
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

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract loginUser(userData: LoginUser): Nullable<User> | Promise<Nullable<User>>;

    abstract validateToken(): Token | Promise<Token>;

    abstract getData(): string | Promise<string>;

    abstract getRole(getRole: string): Nullable<Role> | Promise<Nullable<Role>>;

    abstract getUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract registration(createUser: CreateUserInput): Token | Promise<Token>;

    abstract createRole(createRole: CreateRoleInput): Nullable<Role> | Promise<Nullable<Role>>;

    abstract updateUser(updateUser: UpdateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUsers(deleteUser: string[]): Nullable<Nullable<string>[]> | Promise<Nullable<Nullable<string>[]>>;

    abstract addRole(addRole: RoleInput): Nullable<User> | Promise<Nullable<User>>;

    abstract removeRole(removeRole: RoleInput): Nullable<User> | Promise<Nullable<User>>;
}

export class Token {
    __typename?: 'Token';
    accessToken: string;
    refreshToken: string;
}

export class RefreshToken {
    __typename?: 'RefreshToken';
    userId: string;
    refreshToken: string;
}

export class ActivationLink {
    __typename?: 'ActivationLink';
    email: string;
    link: string;
}

export class Role {
    __typename?: 'Role';
    id: string;
    role: RoleType;
}

export class User {
    __typename?: 'User';
    id: string;
    email: string;
    password: string;
    name: string;
    lastName: string;
    siteNumber: number;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    role?: Nullable<Nullable<Role>[]>;
    token: RefreshToken;
}

type Nullable<T> = T | null;
