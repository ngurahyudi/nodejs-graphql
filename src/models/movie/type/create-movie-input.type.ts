import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { CreateActorInput } from '../../actor/type';
import { CreateAuthorInput } from '../../author/type';

@InputType()
export default class CreateMovieInput {
  @Field({ nullable: false, description: 'Name of the movie' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @Field((type) => [CreateAuthorInput], {
    nullable: true,
    description: `Movie's authors`,
  })
  @IsOptional()
  @IsArray()
  authors: CreateAuthorInput[];

  @Field((type) => [CreateActorInput], {
    nullable: true,
    description: `Movie's actors`,
  })
  @IsOptional()
  @IsArray()
  actors: CreateActorInput[];
}
