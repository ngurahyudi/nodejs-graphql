import { Field, ID, InputType } from 'type-graphql';
import CreateActorInput from './create-actor-input.type';

@InputType()
export default class UpdateActorInput extends CreateActorInput {
  @Field((type) => ID)
  id: string;
}
