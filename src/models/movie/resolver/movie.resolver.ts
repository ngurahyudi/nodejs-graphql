import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { MovieService } from '../movie.service';
import { CreateMovieInput, MovieObjectType, UpdateMovieInput } from '../type';

@Resolver(MovieObjectType)
export class MovieResolver {
  movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  /* This is a query that takes in no arguments and returns an array of MovieObjectType. */
  @Authorized('ADMIN')
  @Query(() => [MovieObjectType])
  async getMovies() {
    return await this.movieService.find();
  }

  /* This is a query that takes in an argument of type string and returns an MovieObjectType. */
  @Query(() => MovieObjectType)
  async findMovie(@Arg('id') id: string) {
    return await this.movieService.findOne(id);
  }

  /* This is a mutation that takes in an argument of type CreateMovieInput and returns an
MovieObjectType. */
  @Mutation(() => MovieObjectType)
  async addMovie(@Arg('params') params: CreateMovieInput) {
    return await this.movieService.add(params);
  }

  /* A mutation that takes in an argument of type string and returns a boolean. */
  @Mutation(() => Boolean)
  async updateMovie(
    @Arg('id') id: string,
    @Arg('params') params: UpdateMovieInput,
  ) {
    return await this.movieService.update(id, params);
  }

  /* A mutation that takes in an argument of type string and returns a boolean. */
  @Mutation(() => Boolean)
  async deleteMovie(@Arg('id') id: string) {
    return await this.movieService.delete(id);
  }
}
