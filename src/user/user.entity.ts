import { RoleEntity } from './../role/entities/role.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '../graphql.schema';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Field()
  @Column()
  public name: string;

  @Field()
  @Column()
  public lastName: string;

  @Field()
  @Column()
  public siteNumber: number;

  @ManyToMany(() => RoleEntity, (role) => role.users, {
    eager: true,
  })
  @JoinTable({ name: 'user_roles' })
  public role: Role[];

  @Field()
  @CreateDateColumn()
  public createdAt: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt: Date;
}
