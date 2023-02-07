import { add } from '../actor.service';
import Actor from '../entity/actor.entity';

jest.mock('../entity/actor.entity');

describe('add', () => {
  it('should call create method', async () => {
    jest.spyOn(Actor, 'create').mockResolvedValue({
      id: 'actor-id',
      name: 'actor-name',
    });

    const result = await add({ name: 'actor-name' });

    expect(Actor.create).toHaveBeenCalled();
    expect(Actor.create).toHaveBeenCalledWith({ name: 'actor-name' });
    expect(result).toMatchObject({
      id: 'actor-id',
      name: 'actor-name',
    });
  });
});
