import { MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class CreateActorInput {
  @Field({ nullable: false, description: 'Name of the actor' })
  @MaxLength(50, { message: 'too long' })
  name: string;
}
