import { RoleType } from './../../graphql.schema';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@ObjectType()
@Entity('roles')
export class RoleEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Field()
  @Column()
  public role: RoleType;

  @ManyToMany(() => UserEntity, (users) => users.role)
  public users: UserEntity[];
}
