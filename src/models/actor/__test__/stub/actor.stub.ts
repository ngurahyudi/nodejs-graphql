import { movieStub } from '../../../movie/__test__/stub/movie.stub';
import { CreateActorDto } from '../../dto/create-actor.dto';

export const actorStub = (): CreateActorDto => ({
  name: 'actor-name',
  movies: [movieStub()],
});
