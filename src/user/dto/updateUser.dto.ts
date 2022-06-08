import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field()
  readonly id!: string;

  @Field()
  readonly name: string;

  @Field()
  readonly lastName: string;

  @Field()
  readonly siteNumber: number;

  @Field()
  readonly email: string;

  @Field()
  readonly password: string;
}
