import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AddRoleDto {
  @Field(() => ID)
  public userId!: string;

  @Field()
  public roleId!: string;
}
