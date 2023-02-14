import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { UserService } from '../user.service';
import { AppContext } from '../../../common/interfaces';
import {
  UserObjectType,
  SignupUserInput,
  UpdateUserInput,
  SignInUserInput,
  SignInResponseType,
} from '../type';

@Resolver(UserObjectType)
export class UserResolver {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /* This is a query that takes in no arguments and returns an array of UserObjectType. */
  @Query(() => [UserObjectType])
  async getUsers() {
    return await this.userService.find();
  }

  /* This is a query that takes in an argument of type string and returns an UserObjectType. */
  @Query(() => UserObjectType)
  async findUser(@Arg('id') id: string) {
    return await this.userService.findOne(id);
  }

  /* This is a query that takes in no arguments and returns a boolean. */
  @Authorized()
  @Query(() => Boolean)
  async signOut(@Ctx() ctx: AppContext) {
    return this.userService.signOut(ctx);
  }

  /* This is a mutation that takes in an argument of type SignupUserInput and returns an
UserObjectType. */
  @Mutation(() => UserObjectType)
  async signup(@Arg('params') params: SignupUserInput) {
    return await this.userService.signup(params);
  }

  /* A mutation that takes in an argument of type SignInUserInput and returns a SignInResponseType. */
  @Mutation(() => SignInResponseType)
  async signIn(@Arg('params') params: SignInUserInput, @Ctx() ctx: AppContext) {
    return this.userService.signIn(params, ctx);
  }

  @Mutation((returns) => Boolean)
  async updateUser(
    @Arg('id') id: string,
    @Arg('params') params: UpdateUserInput,
  ) {
    return await this.userService.update(id, params);
  }

  /* This is a mutation that takes in an argument of type string and returns a boolean. */
  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: string) {
    return await this.userService.delete(id);
  }
}
