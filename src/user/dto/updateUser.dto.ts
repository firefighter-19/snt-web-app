import { Field, InputType } from '@nestjs/graphql';
import { UpdateUserInput } from '../../graphql.schema';

@InputType()
export class UpdateUserDto extends UpdateUserInput {
  @Field()
  readonly userId: string;

  @Field()
  readonly name: string;

  @Field()
  readonly lastName: string;
}
