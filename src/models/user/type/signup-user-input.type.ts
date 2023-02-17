import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { RoleEnum } from '../enums';

@InputType()
export default class SignupUserInput {
  @Field({ nullable: false, description: 'Name of the user' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @Field({ nullable: false, description: 'Email of the user' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @Field({ nullable: false, description: 'Password of the user' })
  @IsString()
  @IsNotEmpty()
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

  @Field((type) => [RoleEnum])
  @IsArray()
  @ArrayMinSize(1)
  roles: RoleEnum[];
}
