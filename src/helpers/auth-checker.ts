import * as jwt from 'jsonwebtoken';
import configs from '../configs/configurations';
import { AppContext } from '../common/interfaces';
import { AuthChecker } from 'type-graphql';
import { UserService } from '../models/user/user.service';

export const authChecker: AuthChecker<AppContext> = async (
  { root, args, context, info },
  roles,
) => {
  let access_token = '';

  if (
    context.req.headers.authorization &&
    context.req.headers.authorization.startsWith('Bearer')
  ) {
    access_token = context.req.headers.authorization.split(' ')[1];
  } else if (context.req.cookies?.access_token) {
    const { access_token: token } = context.req.cookies;
    access_token = token;
  }

  if (!access_token) throw 'no access token found';

  const ACCESS_TOKEN_SECRET = configs.APP_ACCESS_TOKEN_SECRET;

  const decoded = jwt.verify(access_token, ACCESS_TOKEN_SECRET);

  if (!decoded) throw 'invalid access token';

  const userService = new UserService();

  const userId = decoded.sub as string;

  const user = await userService.findOne(userId);

  if (!user) {
    throw 'user longer exist';
  }

  // Assign userId into context
  context.userId = userId;

  if (roles.length <= 0) return true;

  const userRoles: string[] = (decoded as any).roles;

  return roles.some((r) => userRoles.indexOf(r) >= 0);
};
