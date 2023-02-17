import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class SignInUserInput {
  @Field({ nullable: false, description: 'Email of the user' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field({ nullable: false, description: 'Password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
