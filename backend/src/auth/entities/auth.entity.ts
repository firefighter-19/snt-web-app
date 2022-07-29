import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@ObjectType()
@Entity('auth')
export class AuthEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Field()
  @Column()
  public refreshToken!: string;

  @Field()
  @Column()
  public userId: string;

  @OneToOne(() => UserEntity, (user) => user.token, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public user!: UserEntity;
}
