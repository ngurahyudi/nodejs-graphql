import { CreateActorDto } from '../../dto/create-actor.dto';

export const actorStub = (): CreateActorDto => ({
  name: 'actor-name',
});
