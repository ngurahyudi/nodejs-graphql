import Actor from '../entity/actor.entity';
import Movie from '../../movie/entity/movie.entity';
import { ActorService } from '../actor.service';
import { actorStub } from './stub/actor.stub';

jest.mock('../entity/actor.entity');
jest.mock('../../movie/entity/movie.entity');

const actorService = new ActorService();

describe('list actors', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Actor, 'findAll').mockResolvedValue([
      {
        id: 'some-actor-id',
        name: actorStub().name,
      },
    ] as unknown as Actor[]);

    result = await actorService.find();
  });

  it('should call findAll method', async () => {
    expect(Actor.findAll).toHaveBeenCalled();
  });

  it('should call findAll method with correct parameters', () => {
    expect(Actor.findAll).toHaveBeenCalledWith({
      include: [Movie],
    });
  });

  it('should return list of actors', async () => {
    expect(result).toStrictEqual([
      {
        id: 'some-actor-id',
        name: actorStub().name,
      },
    ]);
  });

  it('should throw error if async request error', async () => {
    jest.spyOn(Actor, 'findAll').mockRejectedValue('async error');

    await expect(actorService.find()).rejects.toEqual(new Error('async error'));
  });
});

describe('find actor', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Actor, 'findOne').mockResolvedValue({
      id: 'some-actor-id',
      name: actorStub().name,
    } as unknown as Actor);

    result = await actorService.findOne('some-actor-id');
  });

  it('should call findOne method', () => {
    expect(Actor.findOne).toHaveBeenCalled();
  });

  it('should call findOne method with correct parameters', () => {
    expect(Actor.findOne).toHaveBeenCalledWith({
      where: {
        id: 'some-actor-id',
      },
      include: [Movie],
    });
  });

  it('should return actor data if actor id is found', () => {
    expect(result).toStrictEqual({
      id: 'some-actor-id',
      name: actorStub().name,
    });
  });

  it('should return error if actor id is not found', async () => {
    jest.spyOn(Actor, 'findOne').mockResolvedValueOnce(undefined);

    await expect(actorService.findOne('some-actor-id')).rejects.toEqual(
      new Error('data not found'),
    );
  });
});

describe('add actor', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Actor, 'create').mockResolvedValue({
      id: 'some-actor-id',
      name: actorStub().name,
    });

    result = await actorService.add({ ...actorStub() });
  });

  it('should call create method', () => {
    expect(Actor.create).toHaveBeenCalled();
  });

  it('should call create method with correct parameters', () => {
    expect(Actor.create).toHaveBeenCalledWith(
      { ...actorStub() },
      { include: [Movie] },
    );
  });

  it('should return created actor object with id', () => {
    expect(result).toStrictEqual({
      id: 'some-actor-id',
      name: actorStub().name,
    });
  });

  it('should throw error if async request error', async () => {
    jest.spyOn(Actor, 'create').mockRejectedValue('async error');

    await expect(actorService.add({ ...actorStub() })).rejects.toEqual(
      new Error('async error'),
    );
  });
});

describe('update actor', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Actor, 'update').mockResolvedValue([1]);

    result = await actorService.update('some-actor-id', {
      ...actorStub(),
      id: 'some-actor-id',
    });
  });

  it('should call update method', () => {
    expect(Actor.update).toHaveBeenCalled();
  });

  it('should call update method with correct parameters', () => {
    expect(Actor.update).toHaveBeenCalledWith(
      {
        ...actorStub(),
        id: 'some-actor-id',
      },
      { where: { id: 'some-actor-id' } },
    );
  });

  it('should return true if update process succeeded', () => {
    expect(result).toBeTruthy();
  });

  it('should return error if the actor data to be updated is not found', async () => {
    jest.spyOn(Actor, 'update').mockResolvedValueOnce([0]);

    await expect(
      actorService.update('some-actor-id', {
        ...actorStub(),
        id: 'some-actor-id',
      }),
    ).rejects.toEqual(new Error('data not found'));
  });
});

describe('delete actor', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Actor, 'destroy').mockResolvedValue(1);

    result = await actorService.delete('some-actor-id');
  });

  it('should call destroy method', () => {
    expect(Actor.destroy).toHaveBeenCalled();
  });

  it('should call destroy method with correct parameters', () => {
    expect(Actor.destroy).toHaveBeenCalledWith({
      where: { id: 'some-actor-id' },
    });
  });

  it('should return true if delete process succeeded', () => {
    expect(result).toStrictEqual(true);
  });

  it('should return error if the actor data to be updated is not found', async () => {
    jest.spyOn(Actor, 'destroy').mockResolvedValueOnce(0);

    await expect(actorService.delete('some-actor-id')).rejects.toEqual(
      new Error('data not found'),
    );
  });
});
