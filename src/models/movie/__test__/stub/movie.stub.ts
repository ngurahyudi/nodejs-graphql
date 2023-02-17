import { CreateMovieDto } from '../../dto/create-movie.dto';

// if we using stub for author and actor
// it will cause: Maximum call stack size exceeded
// so instead of use the stub, create object manually
export const movieStub = (): CreateMovieDto => ({
  name: 'movie-name',
  authors: [{ name: 'author-name' }],
  actors: [{ name: 'actor-name' }],
});
