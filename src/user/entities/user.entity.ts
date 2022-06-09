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
} from 'typeorm';
import { AuthEntity } from '../../auth/entities/auth.entity';
import { RoleEntity } from '../../role/entities/role.entity';

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

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({ name: 'user_roles' })
  public role: RoleEntity[];

  @OneToOne(() => AuthEntity, (token) => token.user)
  public token!: AuthEntity;
}
