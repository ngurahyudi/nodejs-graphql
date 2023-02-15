import 'reflect-metadata';
import { Field, ID, ObjectType } from 'type-graphql';
import { MovieObjectType } from '../../movie/type';

@ObjectType()
export default class AuthorObjectType {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: false, description: 'Name of the author' })
  name: string;

  @Field((type) => [MovieObjectType], {
    nullable: true,
    description: `Author's movie`,
  })
  movies: MovieObjectType[];
}
