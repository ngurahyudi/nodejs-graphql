import Actor from '../../actor/entity/actor.entity';
import Author from '../../author/entity/author.entity';
import Movie from '../entity/movie.entity';
import { MovieService } from '../movie.service';
import { movieStub } from './stub/movie.stub';

jest.mock('../entity/movie.entity');

const movieService = new MovieService();

afterEach(() => {
  jest.clearAllMocks();
});

describe('list movies', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Movie, 'findAll').mockResolvedValue([
      {
        id: 'some-movie-id',
        name: movieStub().name,
      },
    ] as unknown as Movie[]);

    result = await movieService.find();
  });

  it('should call findAll method', async () => {
    expect(Movie.findAll).toHaveBeenCalled();
  });

  it('should call findAll method with correct parameters', () => {
    expect(Movie.findAll).toHaveBeenCalledWith({
      include: [Author, Actor],
    });
  });

  it('should return list of movies', async () => {
    expect(result).toStrictEqual([
      {
        id: 'some-movie-id',
        name: movieStub().name,
      },
    ]);
  });

  it('should throw error if async request error', async () => {
    jest.spyOn(Movie, 'findAll').mockRejectedValue('async error');

    await expect(movieService.find()).rejects.toEqual(new Error('async error'));
  });
});

describe('find movie', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Movie, 'findOne').mockResolvedValue({
      id: 'some-movie-id',
      name: movieStub().name,
    } as unknown as Movie);

    result = await movieService.findOne('some-movie-id');
  });

  it('should call findOne method', () => {
    expect(Movie.findOne).toHaveBeenCalled();
  });

  it('should call findOne method with correct parameters', () => {
    expect(Movie.findOne).toHaveBeenCalledWith({
      where: {
        id: 'some-movie-id',
      },
      include: [Author, Actor],
    });
  });

  it('should return movie data if movie id is found', () => {
    expect(result).toStrictEqual({
      id: 'some-movie-id',
      name: movieStub().name,
    });
  });

  it('should return error if movie id is not found', async () => {
    jest.spyOn(Movie, 'findOne').mockResolvedValueOnce(undefined);

    await expect(movieService.findOne('some-movie-id')).rejects.toEqual(
      new Error('data not found'),
    );
  });
});

describe('add movie', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Movie, 'create').mockResolvedValue({
      id: 'some-movie-id',
      name: movieStub().name,
    });

    result = await movieService.add({ ...movieStub() });
  });

  it('should call create method', () => {
    expect(Movie.create).toHaveBeenCalled();
  });

  it('should call create method with correct parameters', () => {
    expect(Movie.create).toHaveBeenCalledWith(
      { ...movieStub() },
      { include: [Author, Actor] },
    );
  });

  it('should return created movie object with id', () => {
    expect(result).toStrictEqual({
      id: 'some-movie-id',
      name: movieStub().name,
    });
  });

  it('should throw error if async request error', async () => {
    jest.spyOn(Movie, 'create').mockRejectedValue('async error');

    await expect(movieService.add({ ...movieStub() })).rejects.toEqual(
      new Error('async error'),
    );
  });
});

describe('update movie', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Movie, 'update').mockResolvedValue([1]);

    result = await movieService.update('some-movie-id', {
      ...movieStub(),
      id: 'some-movie-id',
    });
  });

  it('should call update method', () => {
    expect(Movie.update).toHaveBeenCalled();
  });

  it('should call update method with correct parameters', () => {
    expect(Movie.update).toHaveBeenCalledWith(
      {
        ...movieStub(),
        id: 'some-movie-id',
      },
      { where: { id: 'some-movie-id' } },
    );
  });

  it('should return true if update process succeeded', () => {
    expect(result).toBeTruthy();
  });

  it('should return error if the movie data to be updated is not found', async () => {
    jest.spyOn(Movie, 'update').mockResolvedValueOnce([0]);

    await expect(
      movieService.update('some-movie-id', {
        ...movieStub(),
        id: 'some-movie-id',
      }),
    ).rejects.toEqual(new Error('data not found'));
  });
});

describe('delete movie', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Movie, 'destroy').mockResolvedValue(1);

    result = await movieService.delete('some-movie-id');
  });

  it('should call destroy method', () => {
    expect(Movie.destroy).toHaveBeenCalled();
  });

  it('should call destroy method with correct parameters', () => {
    expect(Movie.destroy).toHaveBeenCalledWith({
      where: { id: 'some-movie-id' },
    });
  });

  it('should return true if delete process succeeded', () => {
    expect(result).toStrictEqual(true);
  });

  it('should return error if the movie data to be updated is not found', async () => {
    jest.spyOn(Movie, 'destroy').mockResolvedValueOnce(0);

    await expect(movieService.delete('some-movie-id')).rejects.toEqual(
      new Error('data not found'),
    );
  });
});
