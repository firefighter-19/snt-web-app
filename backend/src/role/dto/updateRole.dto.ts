import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class updateRoleDto {
  @Field(() => ID)
  public userId!: string;

  @Field()
  public roleId!: string;
}
