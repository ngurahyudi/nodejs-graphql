import Actor from '../entity/actor.entity';
import { ActorResolver } from '../resolver/actor.resolver';
import { ActorService } from '../actor.service';
import { actorStub } from './stub/actor.stub';
import { CreateActorInput } from '../type';
import 'reflect-metadata';

jest.mock('../actor.service.ts');

const mockFind = jest.fn();
const mockFindOne = jest.fn();
const mockAdd = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

(ActorService as jest.Mock).mockImplementation(() => {
  return {
    find: mockFind,
    findOne: mockFindOne,
    add: mockAdd,
    update: mockUpdate,
    delete: mockDelete,
  };
});

describe('list actors', () => {
  const actorResolver = new ActorResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(actorResolver.actorService, 'find').mockResolvedValue([
      {
        id: 'actor-id',
        name: actorStub().name,
      },
    ] as unknown as Actor[]);

    result = await actorResolver.getActors();
  });

  it('should call find method', () => {
    expect(mockFind).toHaveBeenCalled();
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual([
      {
        id: 'actor-id',
        name: actorStub().name,
      },
    ]);
  });
});

describe('find actor', () => {
  const actorResolver = new ActorResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(actorResolver.actorService, 'findOne').mockResolvedValue({
      id: 'actor-id',
      name: actorStub().name,
    } as unknown as Actor);

    result = await actorResolver.findActor('some-actor-id');
  });

  it('should call findOne method', () => {
    expect(mockFindOne).toHaveBeenCalled();
  });

  it('should call findOne method with correct parameters', () => {
    expect(mockFindOne).toHaveBeenCalledWith('some-actor-id');
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual({
      id: 'actor-id',
      name: actorStub().name,
    });
  });
});

describe('add actor', () => {
  const actorResolver = new ActorResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(actorResolver.actorService, 'add').mockResolvedValue({
      id: 'actor-id',
      name: actorStub().name,
    } as unknown as Actor);

    result = await actorResolver.addActor({
      ...actorStub(),
    } as CreateActorInput);
  });

  it('should call add method', () => {
    expect(mockAdd).toHaveBeenCalled();
  });

  it('should call add method with correct parameters', () => {
    expect(mockAdd).toHaveBeenCalledWith({ ...actorStub() });
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual({
      id: 'actor-id',
      name: actorStub().name,
    });
  });
});

describe('update actor', () => {
  const actorResolver = new ActorResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(actorResolver.actorService, 'update').mockResolvedValue(true);

    result = await actorResolver.updateActor('some-actor-id', {
      ...actorStub(),
      id: 'some-actor-id',
    });
  });

  it('should call update method', () => {
    expect(mockUpdate).toHaveBeenCalled();
  });

  it('should call update method with correct parameters', () => {
    expect(mockUpdate).toHaveBeenCalledWith('some-actor-id', {
      ...actorStub(),
      id: 'some-actor-id',
    });
  });

  it(`should return true if update process succeeded`, () => {
    expect(result).toBeTruthy();
  });
});

describe('delete actor', () => {
  const actorResolver = new ActorResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(actorResolver.actorService, 'delete').mockResolvedValue(true);

    result = await actorResolver.deleteActor('some-actor-id');
  });

  it('should call delete method', () => {
    expect(mockDelete).toHaveBeenCalled();
  });

  it('should call delete method with correct parameters', () => {
    expect(mockDelete).toHaveBeenCalledWith('some-actor-id');
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual(true);
  });
});
