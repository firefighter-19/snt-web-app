
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

export class CreateRoleInput {
    role: RoleType;
}

export class CreateUserInput {
    name: string;
    lastName: string;
    siteNumber: number;
    role?: Nullable<RoleType>;
}

export class AddRoleInput {
    userId: string;
    roleId: string;
}

export class UpdateUserInput {
    id: string;
    name?: Nullable<string>;
    lastName?: Nullable<string>;
    siteNumber?: Nullable<number>;
}

export class DeleteUserInput {
    ids: string[];
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createRole(createRole: CreateRoleInput): Nullable<Role> | Promise<Nullable<Role>>;

    abstract createUser(createUser: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUser: UpdateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUsers(deleteUser: string[]): Nullable<Nullable<string>[]> | Promise<Nullable<Nullable<string>[]>>;

    abstract addRole(addRole: AddRoleInput): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract getRole(getRole: string): Nullable<Role> | Promise<Nullable<Role>>;

    abstract getUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class Role {
    __typename?: 'Role';
    id: string;
    role: RoleType;
}

export class User {
    __typename?: 'User';
    id: string;
    name: string;
    lastName: string;
    siteNumber: number;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    role?: Nullable<Nullable<Role>[]>;
}

type Nullable<T> = T | null;
