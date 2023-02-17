import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class SignInResponseType {
  @Field(() => String)
  status: string;

  @Field(() => String)
  access_token: string;
}
