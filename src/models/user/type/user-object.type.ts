import 'reflect-metadata';
import { Field, ID, ObjectType } from 'type-graphql';
import { RoleEnum } from '../enums';

@ObjectType()
export default class UserObjectType {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: false, description: 'Name of the user' })
  name: string;

  @Field({ nullable: false, description: 'Email of the user' })
  email: string;

  @Field((type) => [RoleEnum])
  roles: RoleEnum[];
}
