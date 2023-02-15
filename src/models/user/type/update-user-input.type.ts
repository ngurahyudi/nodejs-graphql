import {
  IsString,
  MaxLength,
  Matches,
  IsEmail,
  Length,
  IsArray,
} from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';
import { RoleEnum } from '../enums';

@InputType()
export default class UpdateUserInput {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true, description: 'Name of the user' })
  @IsString()
  @MaxLength(50)
  name: string;

  @Field({ nullable: true, description: 'Email of the user' })
  @IsString()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @Field({ nullable: true, description: 'Password of the user' })
  @IsString()
  @Length(8, 32)
  @Matches(/^(.*[a-z].*)$/, {
    message: 'password must contain at least one lowercase letter',
  })
  @Matches(/^(.*[A-Z].*)$/, {
    message: 'password must contain at least one uppercase letter',
  })
  @Matches(/^(.*\d.*)$/, {
    message: 'password must contain at least one digit',
  })
  @Matches(/^(.*\W.*)$/, {
    message: 'password must contain at least one non-word letter',
  })
  password: string;

  @Field((type) => [RoleEnum], { nullable: true })
  @IsArray()
  roles: RoleEnum[];
}
