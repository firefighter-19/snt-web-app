
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
    name: string;
    lastName: string;
    siteNumber: number;
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

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract getUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createUser(createUser: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUser: UpdateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUsers(deleteUser: string[]): Nullable<Nullable<string>[]> | Promise<Nullable<Nullable<string>[]>>;
}

export class User {
    __typename?: 'User';
    id: string;
    name: string;
    lastName: string;
    siteNumber: number;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

type Nullable<T> = T | null;
