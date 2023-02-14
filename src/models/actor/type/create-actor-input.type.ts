import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class CreateActorInput {
  @Field({ nullable: false, description: 'Name of the actor' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
