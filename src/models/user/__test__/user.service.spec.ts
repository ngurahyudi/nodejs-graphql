import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from '../entity/user.entity';
import { Request, Response } from 'express';
import { UserService } from '../user.service';
import { userStub } from './stub/user.stub';
import configs from '../../../configs/configurations';
import { TokenPayloadDto } from '../dto';

jest.mock('../entity/user.entity.ts');

jest.mock('bcrypt');

jest.mock('jsonwebtoken');

jest.mock('../../../configs/configurations', () => {
  return {
    APP_ACCESS_TOKEN_SECRET: 'access-token-secret',
    APP_ACCESS_TOKEN_EXP: '10',
    APP_REFRESH_TOKEN_SECRET: 'some-refresh-token-secret',
    APP_REFRESH_TOKEN_EXP: '1440',
  };
});

jest.mock('../user.service', () => {
  const originalModule = jest.requireActual('../user.service');

  return {
    __esModule: true,
    ...originalModule,
    signToken: jest.fn().mockReturnValue({
      access_token: jest.fn(),
      refresh_token: jest.fn(),
    }),
    update: jest.fn(),
  };
});

const userService = new UserService();

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
  let result = [];

  beforeEach(async () => {
    jest.spyOn(User, 'findAll').mockResolvedValue([
      {
        ...userStub(),
        id: 'some-user-id',
      },
    ] as unknown as User[]);

    result = await userService.find();
  });

  it('should call findAll method', async () => {
    expect(User.findAll).toHaveBeenCalled();
  });

  it('should return list of users', async () => {
    expect(result).toStrictEqual([
      {
        ...userStub(),
        id: 'some-user-id',
      },
    ]);
  });

  it('should throw error if async request error', async () => {
    jest.spyOn(User, 'findAll').mockRejectedValue('async error');

    await expect(userService.find()).rejects.toEqual(new Error('async error'));
  });
});

describe('find user', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({
      ...userStub(),
      id: 'some-user-id',
    } as unknown as User);

    result = await userService.findOne('some-user-id');
  });

  it('should call findOne method', () => {
    expect(User.findOne).toHaveBeenCalled();
  });

  it('should call findOne method with correct parameters', () => {
    expect(User.findOne).toHaveBeenCalledWith({
      where: {
        id: 'some-user-id',
      },
    });
  });

  it('should return user data if user id is found', () => {
    expect(result).toStrictEqual({
      ...userStub(),
      id: 'some-user-id',
    });
  });

  it('should throw error if user id is not found', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined);

    await expect(userService.findOne('some-user-id')).rejects.toEqual(
      new Error('data not found'),
    );
  });
});

describe('signup', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(User, 'create').mockResolvedValue({
      ...userStub(),
      id: 'some-user-id',
    });

    result = await userService.signup({ ...userStub() });
  });

  it('should call create method', () => {
    expect(User.create).toHaveBeenCalled();
  });

  it('should call create method with correct parameters', () => {
    expect(User.create).toHaveBeenCalledWith({ ...userStub() });
  });

  it('should return created user object with id', () => {
    expect(result).toStrictEqual({
      ...userStub(),
      id: 'some-user-id',
    });
  });

  it('should throw error if async request error', async () => {
    jest.spyOn(User, 'create').mockRejectedValue('async error');

    await expect(userService.signup({ ...userStub() })).rejects.toEqual(
      new Error('async error'),
    );
  });
});

describe('signIn', () => {
  describe('user validation failed', () => {
    it('should throw error if user is not found', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined);

      await expect(
        userService.signIn(
          {
            email: userStub().email,
            password: userStub().password,
          },
          context,
        ),
      ).rejects.toEqual(new Error('invalid email or password'));
    });

    it(`should throw error if password doesn't match`, async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        ...userStub(),
        id: 'some-user-id',
      } as unknown as User);

      (bcrypt.compare as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(false),
      );

      await expect(
        userService.signIn(
          {
            email: userStub().email,
            password: userStub().password,
          },
          context,
        ),
      ).rejects.toEqual(new Error('invalid email or password'));
    });
  });

  describe('user validation passed', () => {
    let result = {};

    beforeEach(async () => {
      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        ...userStub(),
        id: 'some-user-id',
        password: 'hashed-password',
      } as unknown as User);

      (bcrypt.compare as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(true),
      );

      jest.spyOn(userService, 'signToken').mockReturnValueOnce({
        access_token: 'some-access-token',
        refresh_token: 'some-refresh-token',
      });

      jest.spyOn(userService, 'update').mockResolvedValueOnce(true);

      result = await userService.signIn(
        {
          email: userStub().email,
          password: userStub().password,
        },
        context,
      );
    });

    it(`should create cookies`, async () => {
      expect(context.res.cookie).toHaveBeenCalledTimes(3);
    });

    it(`should return success status and access_token`, () => {
      expect(result).toStrictEqual({
        status: 'success',
        access_token: 'some-access-token',
      });
    });
  });
});

describe('update user', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(User, 'update').mockResolvedValue([1]);

    result = await userService.update('some-user-id', {
      ...userStub(),
      id: 'some-user-id',
    });
  });

  it('should call update method', () => {
    expect(User.update).toHaveBeenCalled();
  });

  it('should call update method with correct parameters', () => {
    expect(User.update).toHaveBeenCalledWith(
      {
        ...userStub(),
        id: 'some-user-id',
      },
      { where: { id: 'some-user-id' }, individualHooks: true },
    );
  });

  it('should return true if update process succeeded', () => {
    expect(result).toBeTruthy();
  });

  it('should throw error if the user data to be updated is not found', async () => {
    jest.spyOn(User, 'update').mockResolvedValueOnce([0]);

    await expect(
      userService.update('some-user-id', {
        ...userStub(),
        id: 'some-user-id',
      }),
    ).rejects.toEqual(new Error('data not found'));
  });
});

describe('delete user', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(User, 'destroy').mockResolvedValue(1);

    result = await userService.delete('some-user-id');
  });

  it('should call destroy method', () => {
    expect(User.destroy).toHaveBeenCalled();
  });

  it('should call destroy method with correct parameters', () => {
    expect(User.destroy).toHaveBeenCalledWith({
      where: { id: 'some-user-id' },
    });
  });

  it('should return true if delete process succeeded', () => {
    expect(result).toStrictEqual(true);
  });

  it('should throw error if the user data to be updated is not found', async () => {
    jest.spyOn(User, 'destroy').mockResolvedValueOnce(0);

    await expect(userService.delete('some-user-id')).rejects.toEqual(
      new Error('data not found'),
    );
  });
});

describe('sign out', () => {
  let result: boolean;

  beforeEach(async () => {
    jest.spyOn(userService, 'update').mockResolvedValueOnce(true);

    result = await userService.signOut(context);
  });

  it(`should clear user's refresh token from the database`, async () => {
    expect(userService.update).toHaveBeenCalled();
    expect(userService.update).toHaveBeenCalledWith(context.userId, {
      id: context.userId,
      refreshToken: null,
    });
  });

  it(`should remove cookies`, async () => {
    expect(context.res.cookie).toHaveBeenCalledTimes(3);
  });

  it('should return true if sign out process succeeded', () => {
    expect(result).toStrictEqual(true);
  });
});

describe('refreshAccessToken', () => {
  describe('refresh token validation failed', () => {
    it(`should throw error if request doesn't have refresh_token cookie`, async () => {
      context.req.cookies.refresh_token = undefined;

      await expect(userService.refreshAccessToken(context)).rejects.toEqual(
        new Error('no refresh token found'),
      );
    });

    it(`should throw error if the refresh_token found but failed to be verified`, async () => {
      context.req.cookies.refresh_token = 'some-refresh-token';

      (jwt.verify as jest.Mock).mockImplementationOnce(() => false);

      await expect(userService.refreshAccessToken(context)).rejects.toEqual(
        new Error('invalid refresh token'),
      );
    });

    it(`should throw error if the refresh_token found and verified but the user data is no longer available in the database`, async () => {
      context.req.cookies.refresh_token = 'some-refresh-token';

      (jwt.verify as jest.Mock).mockImplementationOnce(() => true);

      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(undefined);

      await expect(userService.refreshAccessToken(context)).rejects.toEqual(
        new Error('user no longer exist'),
      );
    });

    it(`should throw error if the refresh_token found and verified but refresh_token hash is invalid`, async () => {
      context.req.cookies.refresh_token = 'some-refresh-token';

      (jwt.verify as jest.Mock).mockImplementationOnce(() => true);

      jest
        .spyOn(userService, 'findOne')
        .mockResolvedValueOnce({ ...userStub() } as unknown as User);

      (bcrypt.compare as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(false),
      );

      await expect(userService.refreshAccessToken(context)).rejects.toEqual(
        new Error('no refresh token found'),
      );
    });
  });

  describe('refresh token validation passed', () => {
    let result = {};

    beforeEach(async () => {
      context.req.cookies.refresh_token = 'some-refresh-token';

      (jwt.verify as jest.Mock).mockImplementationOnce(() => true);

      jest.spyOn(userService, 'findOne').mockResolvedValueOnce({
        ...userStub(),
        id: 'some-user-id',
      } as unknown as User);

      (bcrypt.compare as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(true),
      );

      jest.spyOn(userService, 'signToken').mockReturnValueOnce({
        access_token: 'some-access-token',
        refresh_token: 'some-refresh-token',
      });

      jest.spyOn(userService, 'update').mockResolvedValueOnce(true);

      result = await userService.refreshAccessToken(context);
    });

    it(`should update user's refresh token hash into the database`, async () => {
      expect(userService.update).toHaveBeenCalled();
      expect(userService.update).toHaveBeenCalledWith('some-user-id', {
        id: 'some-user-id',
        refreshToken: 'some-refresh-token',
      });
    });

    it(`should create cookies`, async () => {
      expect(context.res.cookie).toHaveBeenCalledTimes(3);
    });

    it(`should return success status and access_token`, () => {
      expect(result).toStrictEqual({
        status: 'success',
        access_token: 'some-access-token',
      });
    });
  });
});

describe('signToken', () => {
  let result = {};
  const payload: TokenPayloadDto = {
    id: 'some-user-id',
    roles: ['USER'],
  };

  beforeEach(() => {
    (jwt.sign as jest.Mock).mockImplementationOnce(
      () => 'some-jwt-access-token',
    );

    (jwt.sign as jest.Mock).mockImplementationOnce(
      () => 'some-jwt-refresh-token',
    );

    result = userService.signToken(payload);
  });

  it(`should call jwt.sign method`, () => {
    expect(jwt.sign).toHaveBeenCalledTimes(2);
  });

  it(`should return access_token and refresh_token`, () => {
    expect(result).toStrictEqual({
      access_token: 'some-jwt-access-token',
      refresh_token: 'some-jwt-refresh-token',
    });
  });
});
