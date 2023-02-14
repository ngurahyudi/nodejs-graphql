import { registerEnumType } from 'type-graphql';
import { RoleEnum } from './role.enum';

registerEnumType(RoleEnum, {
  name: 'RoleEnum', // this one is mandatory
  description: 'User role enum', // this one is optional
});
