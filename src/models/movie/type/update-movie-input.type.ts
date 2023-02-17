import { Field, ID, InputType } from 'type-graphql';
import CreateMovieInput from './create-movie-input.type';

@InputType()
export default class UpdateMovieInput extends CreateMovieInput {
  @Field((type) => ID)
  id: string;
}
