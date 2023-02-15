import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { CreateMovieInput } from '../../movie/type';

@InputType()
export default class CreateAuthorInput {
  @Field({ nullable: false, description: 'Name of the author' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @Field((type) => [CreateMovieInput], {
    nullable: true,
    description: `Author's movie`,
  })
  @IsOptional()
  @IsArray()
  movies: CreateMovieInput[];
}
