import { CreateActorDto } from './dto/create-actor.dto';
import Actor from './entity/actor.entity';

export async function add(params: CreateActorDto) {
  try {
    return await Actor.create({ ...params });
  } catch (error) {
    throw new Error(error);
  }
}
