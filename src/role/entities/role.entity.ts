import { RoleType } from './../../graphql.schema';
// import { UserRoleEntity } from './user-role.entity';
import { UserEntity } from '../../user/user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@ObjectType()
@Entity('role')
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
