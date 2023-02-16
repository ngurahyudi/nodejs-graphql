import configs from '../../configs/configurations';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignInDto, SignupDto, TokenPayloadDto, UpdateUserDto } from './dto';
import User from './entity/user.entity';
import { AppContext } from '../../common/interfaces';

export class UserService {
  ACCESS_TOKEN_SECRET = configs.APP_ACCESS_TOKEN_SECRET;
  ACCESS_TOKEN_EXP = configs.APP_ACCESS_TOKEN_EXP;
  REFRESH_TOKEN_SECRET = configs.APP_REFRESH_TOKEN_SECRET;
  REFRESH_TOKEN_EXP = configs.APP_REFRESH_TOKEN_EXP;

  /**
   * It returns all the actors in the database
   * @returns An array of all the actors in the database.
   */
  async find() {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Find an user by id.
   * @param {string} id - string - the id of the user we want to find
   * @returns An user with the given id.
   */
  async findOne(id: string) {
    try {
      const user = await User.findOne({ where: { id } });

      if (!user) throw 'data not found';

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It takes in a SignupDto object, creates a new User object, and returns it
   * @param {SignupDto} params - SignupDto
   * @returns The user that was created
   */
  async signup(params: SignupDto) {
    try {
      return await User.create({ ...params });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * We're using the `signInDto` to find a user in the database, then we're comparing the password to
   * the one in the database, then we're signing a token with the user's id and roles, then we're
   * setting the access and refresh tokens as cookies, and finally we're returning the access token
   * @param {SignInDto} params - SignInDto - this is the data that is passed in from the frontend.
   * @param {AppContext}  - params: SignInDto
   */
  async signIn(params: SignInDto, { res }: AppContext) {
    try {
      const errorMessage = 'invalid email or password';

      const user = await User.findOne({ where: { email: params.email } });

      if (!user) throw errorMessage;

      // compare password
      const isPasswordValid = await bcrypt.compare(
        params.password,
        user.password,
      );

      if (!isPasswordValid) throw errorMessage;

      const { access_token, refresh_token } = this.signToken({
        id: user.id,
        roles: user.roles,
      });

      // save refresh token into database
      await this.update(user.id, {
        id: user.id,
        refreshToken: refresh_token,
      });

      res.cookie('access_token', access_token, {
        maxAge: +this.ACCESS_TOKEN_EXP * 60 * 1000,
        expires: new Date(Date.now() + +this.ACCESS_TOKEN_EXP * 60 * 1000),
      });

      res.cookie('refresh_token', refresh_token, {
        maxAge: +this.REFRESH_TOKEN_EXP * 60 * 1000,
        expires: new Date(Date.now() + +this.REFRESH_TOKEN_EXP * 60 * 1000),
      });

      res.cookie('logged_in', 'true', {
        maxAge: +this.ACCESS_TOKEN_EXP * 60 * 1000,
        expires: new Date(Date.now() + +this.ACCESS_TOKEN_EXP * 60 * 1000),
        httpOnly: false,
      });

      return {
        status: 'success',
        access_token,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It updates the user's data based on the id and the params passed to the function
   * @param {string} id - string - The id of the user to update
   * @param {UpdateUserDto} params - UpdateUserDto
   * @returns The result of the update query.
   */
  async update(id: string, params: UpdateUserDto) {
    try {
      const result = await User.update(
        { ...params },
        { where: { id }, individualHooks: true },
      );

      if (result[0] === 0) throw 'data not found';

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It deletes an user from the database
   * @param {string} id - string - The id of the user to delete.
   * @returns The id of the user that was deleted.
   */
  async delete(id: string) {
    try {
      const result = await User.destroy({ where: { id } });

      if (result !== 1) throw 'data not found';

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It removes the refresh token from the database and clears the cookies from the browser
   * @param {AppContext}  - AppContext - This is the context object that is passed to the resolver. It
   * contains the request, response, and userId.
   * @returns A boolean value
   */
  async signOut({ res, userId }: AppContext) {
    try {
      // remove refresh token from database
      await this.update(userId, {
        id: userId,
        refreshToken: null,
      });

      // Logout user
      res.cookie('access_token', '', { maxAge: -1 });
      res.cookie('refresh_token', '', { maxAge: -1 });
      res.cookie('logged_in', '', { maxAge: -1 });

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It takes in a userId, finds the user in the database, verifies the refresh token, and returns a
   * new access token
   * @param {AppContext}  - AppContext - this is the context object that is passed to the resolver
   * function. It contains the request, response, and userId.
   */
  async refreshAccessToken({ req, res, userId }: AppContext) {
    try {
      const errorMessage = 'no refresh token found';

      let refreshToken = '';

      if (req.cookies?.refresh_token) {
        const { refresh_token: token } = req.cookies;
        refreshToken = token;
      }

      if (!refreshToken) throw errorMessage;

      const decoded = jwt.verify(refreshToken, this.REFRESH_TOKEN_SECRET);

      if (!decoded) throw 'invalid refresh token';

      const user = await this.findOne(userId);

      if (!user) {
        throw 'user no longer exist';
      }

      // verify refresh token with hashed token in the database
      const isTokenValid = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );

      if (!isTokenValid) throw errorMessage;

      const { access_token, refresh_token } = this.signToken({
        id: user.id,
        roles: user.roles,
      });

      // save refresh token into database
      await this.update(user.id, {
        id: user.id,
        refreshToken: refresh_token,
      });

      res.cookie('access_token', access_token, {
        maxAge: +this.ACCESS_TOKEN_EXP * 60 * 1000,
        expires: new Date(Date.now() + +this.ACCESS_TOKEN_EXP * 60 * 1000),
      });

      res.cookie('refresh_token', refresh_token, {
        maxAge: +this.REFRESH_TOKEN_EXP * 60 * 1000,
        expires: new Date(Date.now() + +this.REFRESH_TOKEN_EXP * 60 * 1000),
      });

      res.cookie('logged_in', 'true', {
        maxAge: +this.ACCESS_TOKEN_EXP * 60 * 1000,
        expires: new Date(Date.now() + +this.ACCESS_TOKEN_EXP * 60 * 1000),
        httpOnly: false,
      });

      return {
        status: 'success',
        access_token,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * It takes a payload, signs it with a secret, and returns the signed token
   * @param {TokenPayloadDto} params - TokenPayloadDto
   * @returns An object with two properties: access_token and refresh_token.
   */
  signToken(params: TokenPayloadDto): {
    access_token: string;
    refresh_token: string;
  } {
    const payload = {
      sub: params.id,
      roles: params.roles,
    };

    const accessToken = jwt.sign(payload, this.ACCESS_TOKEN_SECRET, {
      expiresIn: `${this.ACCESS_TOKEN_EXP}m`,
    });

    const refreshToken = jwt.sign(payload, this.REFRESH_TOKEN_SECRET, {
      expiresIn: `${this.REFRESH_TOKEN_EXP}m`,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
