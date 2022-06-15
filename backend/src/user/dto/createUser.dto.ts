import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  public email!: string;

  @Field()
  public password!: string;

  @Field()
  public name!: string;

  @Field()
  public lastName!: string;

  @Field()
  public siteNumber!: number;
}
