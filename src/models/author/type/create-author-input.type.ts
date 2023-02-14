import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class CreateAuthorInput {
  @Field({ nullable: false, description: 'Name of the author' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
