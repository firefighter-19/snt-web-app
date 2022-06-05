import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class roleDto {
  @Field(() => ID)
  public userId!: string;

  @Field()
  public roleId!: string;
}
