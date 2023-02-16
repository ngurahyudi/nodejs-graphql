import { SignupDto } from '../../dto/signup.dto';

export const userStub = (): SignupDto => {
  return {
    name: 'some-user-name',
    email: 'some-user-email',
    password: 'some-user-password',
  };
};
