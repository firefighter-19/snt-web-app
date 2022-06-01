import { Field, InputType } from '@nestjs/graphql';
import { UpdateUserInput } from '../../graphql.schema';

@InputType()
export class UpdateUserDto extends UpdateUserInput {
  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  lastName: string;
}
