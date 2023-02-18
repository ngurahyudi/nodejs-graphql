import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { AuthorService } from '../author.service';
import {
  CreateAuthorInput,
  AuthorObjectType,
  UpdateAuthorInput,
} from '../type';

@Resolver(AuthorObjectType)
export class AuthorResolver {
  authorService: AuthorService;

  constructor() {
    this.authorService = new AuthorService();
  }

  /* This is a query that takes in no arguments and returns an array of AuthorObjectType. */
  @Authorized()
  @Query(() => [AuthorObjectType])
  async getAuthors() {
    return await this.authorService.find();
  }

  /* This is a query that takes in an argument of type string and returns an AuthorObjectType. */
  @Authorized()
  @Query(() => AuthorObjectType)
  async findAuthor(@Arg('id') id: string) {
    return await this.authorService.findOne(id);
  }

  /* This is a mutation that takes in an argument of type CreateAuthorInput and returns an
AuthorObjectType. */
  @Authorized()
  @Mutation(() => AuthorObjectType)
  async addAuthor(@Arg('params') params: CreateAuthorInput) {
    return await this.authorService.add(params);
  }

  /* A mutation that takes in an argument of type string and returns a boolean. */
  @Authorized()
  @Mutation(() => Boolean)
  async updateAuthor(
    @Arg('id') id: string,
    @Arg('params') params: UpdateAuthorInput,
  ) {
    return await this.authorService.update(id, params);
  }

  /* A mutation that takes in an argument of type string and returns a boolean. */
  @Authorized()
  @Mutation(() => Boolean)
  async deleteAuthor(@Arg('id') id: string) {
    return await this.authorService.delete(id);
  }
}
