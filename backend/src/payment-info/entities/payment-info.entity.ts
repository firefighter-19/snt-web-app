import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@ObjectType()
@Entity('payment-info')
export class PaymentInfoEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Field()
  @Column()
  public siteNumber: number;

  @Field()
  @Column({
    default: 0,
  })
  public debt: number;

  @Field()
  @Column({
    default: 0,
  })
  public memberFee: number;

  @Field()
  @Column({
    default: 0,
  })
  public trashFee: number;

  @Field()
  @Column({
    default: 0,
  })
  public electroFee: number;

  @Field()
  @Column({
    default: 0,
  })
  public targetFee: number;

  @Field()
  @Column({
    default: 0,
  })
  public sumFee: number;

  @OneToOne(() => UserEntity, (user) => user.paymentInfo)
  @JoinColumn()
  public user: UserEntity;
}
