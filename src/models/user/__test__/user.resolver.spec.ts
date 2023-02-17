import User from '../entity/user.entity';
import { Request, Response } from 'express';
import { RoleEnum } from '../enums';
import { SignupUserInput } from '../type';
import { UserResolver } from '../resolver/user.resolver';
import { UserService } from '../user.service';
import { userStub } from './stub/user.stub';
import 'reflect-metadata';

jest.mock('../user.service.ts');

const mockFind = jest.fn();
const mockFindOne = jest.fn();
const mockSignup = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
const mockSignIn = jest.fn();
const mockSignOut = jest.fn();
const mockRefreshAccessToken = jest.fn();

(UserService as jest.Mock).mockImplementation(() => {
  return {
    find: mockFind,
    findOne: mockFindOne,
    signup: mockSignup,
    signIn: mockSignIn,
    update: mockUpdate,
    delete: mockDelete,
    signOut: mockSignOut,
    refreshAccessToken: mockRefreshAccessToken,
  };
});

const context = {
  req: {
    cookies: {
      access_token: 'some-access-token',
      refresh_token: 'some-refresh-token',
    },
  } as unknown as Request,
  res: {
    cookie: jest.fn(),
  } as unknown as Response,
  userId: 'some-user-id',
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('list users', () => {
  const userResolver = new UserResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(userResolver.userService, 'find').mockResolvedValue([
      {
        id: 'user-id',
        name: userStub().name,
      },
    ] as unknown as User[]);

    result = await userResolver.getUsers();
  });

  it('should call find method', () => {
    expect(mockFind).toHaveBeenCalled();
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual([
      {
        id: 'user-id',
        name: userStub().name,
      },
    ]);
  });
});

describe('find user', () => {
  const userResolver = new UserResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(userResolver.userService, 'findOne').mockResolvedValue({
      id: 'user-id',
      name: userStub().name,
    } as unknown as User);

    result = await userResolver.findUser('some-user-id');
  });

  it('should call findOne method', () => {
    expect(mockFindOne).toHaveBeenCalled();
  });

  it('should call findOne method with correct parameters', () => {
    expect(mockFindOne).toHaveBeenCalledWith('some-user-id');
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual({
      id: 'user-id',
      name: userStub().name,
    });
  });
});

describe('signup', () => {
  const userResolver = new UserResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(userResolver.userService, 'signup').mockResolvedValue({
      ...userStub(),
      id: 'user-id',
    } as unknown as User);

    result = await userResolver.signup({
      ...userStub(),
    } as SignupUserInput);
  });

  it('should call add method', () => {
    expect(mockSignup).toHaveBeenCalled();
  });

  it('should call add method with correct parameters', () => {
    expect(mockSignup).toHaveBeenCalledWith({ ...userStub() });
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual({
      ...userStub(),
      id: 'user-id',
    });
  });
});

describe('update user', () => {
  const userResolver = new UserResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(userResolver.userService, 'update').mockResolvedValue(true);

    result = await userResolver.updateUser('some-user-id', {
      ...userStub(),
      id: 'some-user-id',
      roles: [RoleEnum.ADMIN],
    });
  });

  it('should call update method', () => {
    expect(mockUpdate).toHaveBeenCalled();
  });

  it('should call update method with correct parameters', () => {
    expect(mockUpdate).toHaveBeenCalledWith('some-user-id', {
      ...userStub(),
      id: 'some-user-id',
      roles: [RoleEnum.ADMIN],
    });
  });

  it(`should return true if update process succeeded`, () => {
    expect(result).toBeTruthy();
  });
});

describe('delete user', () => {
  const userResolver = new UserResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(userResolver.userService, 'delete').mockResolvedValue(true);

    result = await userResolver.deleteUser('some-user-id');
  });

  it('should call delete method', () => {
    expect(mockDelete).toHaveBeenCalled();
  });

  it('should call delete method with correct parameters', () => {
    expect(mockDelete).toHaveBeenCalledWith('some-user-id');
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual(true);
  });
});

describe('sign in', () => {
  const userResolver = new UserResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(userResolver.userService, 'signIn').mockResolvedValue({
      status: 'success',
      access_token: 'some-access-token',
    });

    result = await userResolver.signIn(
      {
        email: userStub().email,
        password: userStub().password,
      },
      context,
    );
  });

  it('should call signIn method', () => {
    expect(mockSignIn).toHaveBeenCalled();
  });

  it('should call signIn method with correct parameters', () => {
    expect(mockSignIn).toHaveBeenCalledWith(
      {
        email: userStub().email,
        password: userStub().password,
      },
      context,
    );
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual({
      status: 'success',
      access_token: 'some-access-token',
    });
  });
});

describe('sign out', () => {
  const userResolver = new UserResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(userResolver.userService, 'signOut').mockResolvedValue(true);

    result = await userResolver.signOut(context);
  });

  it('should call signOut method', () => {
    expect(mockSignOut).toHaveBeenCalled();
  });

  it('should call signOut method with correct parameters', () => {
    expect(mockSignOut).toHaveBeenCalledWith(context);
  });

  it(`should return appropriate results`, () => {
    expect(result).toBeTruthy();
  });
});

describe('refresh access token', () => {
  const userResolver = new UserResolver();

  let result = {};

  beforeEach(async () => {
    jest
      .spyOn(userResolver.userService, 'refreshAccessToken')
      .mockResolvedValue({
        status: 'success',
        access_token: 'some-access-token',
      });

    result = await userResolver.refreshAccessToken(context);
  });

  it('should call mockRefreshAccessToken method', () => {
    expect(mockRefreshAccessToken).toHaveBeenCalled();
  });

  it('should call refreshAccessToken method with correct parameters', () => {
    expect(mockRefreshAccessToken).toHaveBeenCalledWith(context);
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual({
      status: 'success',
      access_token: 'some-access-token',
    });
  });
});
