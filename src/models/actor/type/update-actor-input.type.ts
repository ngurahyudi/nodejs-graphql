import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export default class UpdateActorInput {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: false, description: 'Name of the actor' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
