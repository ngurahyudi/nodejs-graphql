import { RoleEnum } from '../enums';
import { SignupDto } from './signup.dto';

export class UpdateUserDto {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  roles?: RoleEnum[];
  refreshToken?: string;
}
