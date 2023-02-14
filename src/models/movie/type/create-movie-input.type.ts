import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class CreateMovieInput {
  @Field({ nullable: false, description: 'Name of the movie' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
