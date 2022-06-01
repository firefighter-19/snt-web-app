import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  lastName: string;
}
