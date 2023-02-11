import 'reflect-metadata';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class ActorObjectType {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: false, description: 'Name of the actor' })
  name: string;
}
