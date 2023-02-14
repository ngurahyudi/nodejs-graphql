import { Field, ID, InputType } from 'type-graphql';
import CreateAuthorInput from './create-author-input.type';

@InputType()
export default class UpdateAuthorInput extends CreateAuthorInput {
  @Field((type) => ID)
  id: string;
}
