import { movieStub } from '../../../movie/__test__/stub/movie.stub';
import { CreateAuthorDto } from '../../dto/create-author.dto';

export const authorStub = (): CreateAuthorDto => ({
  name: 'author-name',
  movies: [movieStub()],
});
