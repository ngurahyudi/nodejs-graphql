import 'reflect-metadata';
import { Field, ID, ObjectType } from 'type-graphql';
import { ActorObjectType } from '../../actor/type';
import { AuthorObjectType } from '../../author/type';

@ObjectType()
export default class MovieObjectType {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: false, description: 'Name of the movie' })
  name: string;

  @Field((type) => [AuthorObjectType], {
    nullable: true,
    description: `Movie's authors`,
  })
  authors: AuthorObjectType[];

  @Field((type) => [ActorObjectType], {
    nullable: true,
    description: `Movie's actors`,
  })
  actors: ActorObjectType[];
}
