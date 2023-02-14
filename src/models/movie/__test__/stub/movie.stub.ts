import { CreateMovieDto } from '../../dto/create-movie.dto';

export const movieStub = (): CreateMovieDto => ({
  name: 'movie-name',
});
