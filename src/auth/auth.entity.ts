import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@ObjectType()
@Entity()
export class AuthEntity {
  @Field()
  @PrimaryGeneratedColumn('increment')
  public id!: string;

  @OneToOne(() => UserEntity, (user) => user.id)
  public user: UserEntity;

  @Field()
  @Column()
  public refreshToken!: string;
}
