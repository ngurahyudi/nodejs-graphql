import 'reflect-metadata';
import { MovieService } from '../movie.service';
import { MovieResolver } from '../resolver/movie.resolver';
import { movieStub } from './stub/movie.stub';
import Movie from '../entity/movie.entity';

jest.mock('../movie.service.ts');

const mockFind = jest.fn();
const mockFindOne = jest.fn();
const mockAdd = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

(MovieService as jest.Mock).mockImplementation(() => {
  return {
    find: mockFind,
    findOne: mockFindOne,
    add: mockAdd,
    update: mockUpdate,
    delete: mockDelete,
  };
});

describe('list movies', () => {
  const movieResolver = new MovieResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(movieResolver.movieService, 'find').mockResolvedValue([
      {
        id: 'movie-id',
        name: movieStub().name,
      },
    ] as unknown as Movie[]);

    result = await movieResolver.getMovies();
  });

  it('should call find method', () => {
    expect(mockFind).toHaveBeenCalled();
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual([
      {
        id: 'movie-id',
        name: movieStub().name,
      },
    ]);
  });
});

describe('find movie', () => {
  const movieResolver = new MovieResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(movieResolver.movieService, 'findOne').mockResolvedValue({
      id: 'movie-id',
      name: movieStub().name,
    } as unknown as Movie);

    result = await movieResolver.findMovie('some-movie-id');
  });

  it('should call findOne method', () => {
    expect(mockFindOne).toHaveBeenCalled();
  });

  it('should call findOne method with correct parameters', () => {
    expect(mockFindOne).toHaveBeenCalledWith('some-movie-id');
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual({
      id: 'movie-id',
      name: movieStub().name,
    });
  });
});

describe('add movie', () => {
  const movieResolver = new MovieResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(movieResolver.movieService, 'add').mockResolvedValue({
      id: 'movie-id',
      name: movieStub().name,
    } as unknown as Movie);

    result = await movieResolver.addMovie({ ...movieStub() });
  });

  it('should call add method', () => {
    expect(mockAdd).toHaveBeenCalled();
  });

  it('should call add method with correct parameters', () => {
    expect(mockAdd).toHaveBeenCalledWith({ ...movieStub() });
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual({
      id: 'movie-id',
      name: movieStub().name,
    });
  });
});

describe('update movie', () => {
  const movieResolver = new MovieResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(movieResolver.movieService, 'update').mockResolvedValue({
      id: 'movie-id',
      name: movieStub().name,
    });

    result = await movieResolver.updateMovie('some-movie-id', {
      ...movieStub(),
      id: 'some-movie-id',
    });
  });

  it('should call update method', () => {
    expect(mockUpdate).toHaveBeenCalled();
  });

  it('should call update method with correct parameters', () => {
    expect(mockUpdate).toHaveBeenCalledWith('some-movie-id', {
      ...movieStub(),
      id: 'some-movie-id',
    });
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual({
      id: 'movie-id',
      name: movieStub().name,
    });
  });
});

describe('delete movie', () => {
  const movieResolver = new MovieResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(movieResolver.movieService, 'delete').mockResolvedValue(true);

    result = await movieResolver.deleteMovie('some-movie-id');
  });

  it('should call delete method', () => {
    expect(mockDelete).toHaveBeenCalled();
  });

  it('should call delete method with correct parameters', () => {
    expect(mockDelete).toHaveBeenCalledWith('some-movie-id');
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual(true);
  });
});
