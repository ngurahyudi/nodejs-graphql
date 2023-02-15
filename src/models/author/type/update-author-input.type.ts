import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export default class UpdateAuthorInput {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: false, description: 'Name of the author' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
