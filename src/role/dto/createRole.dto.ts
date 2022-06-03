import { RoleType } from './../../graphql.schema';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoleDto {
  @Field()
  public role!: RoleType;
}
