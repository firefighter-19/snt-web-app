
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
    userId: string;
    name: string;
    lastName: string;
    siteNumber: number;
}

export class UpdateUserInput {
    userId: string;
}

export class DeleteUserInput {
    userId: string;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract getUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createUser(createUserInput: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    __typename?: 'User';
    userId: string;
    name: string;
    lastName: string;
    siteNumber: number;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

type Nullable<T> = T | null;
