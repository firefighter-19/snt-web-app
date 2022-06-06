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
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '../graphql.schema';
import { AuthEntity } from '../auth/auth.entity';

@ObjectType()
@Entity('users')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Field()
  @Column()
  public email!: string;

  @Field()
  @Column()
  public password!: string;

  @Field()
  @Column()
  public name: string;

  @Field()
  @Column()
  public lastName: string;

  @Field()
  @Column()
  public siteNumber: number;

  @Field()
  @CreateDateColumn()
  public createdAt: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToMany(() => RoleEntity, (role) => role.users, {
    eager: true,
  })
  @JoinTable({ name: 'user_roles' })
  public role: Role[];

  @OneToOne(() => AuthEntity, (token) => token.refreshToken)
  @JoinColumn()
  public refreshToken!: string;
}
