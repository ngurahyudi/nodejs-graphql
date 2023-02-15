import Author from '../entity/author.entity';
import Movie from '../../movie/entity/movie.entity';
import { AuthorService } from '../author.service';
import { authorStub } from './stub/author.stub';

jest.mock('../entity/author.entity');

const authorService = new AuthorService();

describe('list authors', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Author, 'findAll').mockResolvedValue([
      {
        id: 'some-author-id',
        name: authorStub().name,
      },
    ] as unknown as Author[]);

    result = await authorService.find();
  });

  it('should call findAll method', async () => {
    expect(Author.findAll).toHaveBeenCalled();
  });

  it('should call findAll method with correct parameters', () => {
    expect(Author.findAll).toHaveBeenCalledWith({
      include: [Movie],
    });
  });

  it('should return list of authors', async () => {
    expect(result).toStrictEqual([
      {
        id: 'some-author-id',
        name: authorStub().name,
      },
    ]);
  });

  it('should throw error if async request error', async () => {
    jest.spyOn(Author, 'findAll').mockRejectedValue('async error');

    await expect(authorService.find()).rejects.toEqual(
      new Error('async error'),
    );
  });
});

describe('find author', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Author, 'findOne').mockResolvedValue({
      id: 'some-author-id',
      name: authorStub().name,
    } as unknown as Author);

    result = await authorService.findOne('some-author-id');
  });

  it('should call findOne method', () => {
    expect(Author.findOne).toHaveBeenCalled();
  });

  it('should call findOne method with correct parameters', () => {
    expect(Author.findOne).toHaveBeenCalledWith({
      where: {
        id: 'some-author-id',
      },
      include: [Movie],
    });
  });

  it('should return author data if author id is found', () => {
    expect(result).toStrictEqual({
      id: 'some-author-id',
      name: authorStub().name,
    });
  });

  it('should return error if author id is not found', async () => {
    jest.spyOn(Author, 'findOne').mockResolvedValueOnce(undefined);

    await expect(authorService.findOne('some-author-id')).rejects.toEqual(
      new Error('data not found'),
    );
  });
});

describe('add author', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Author, 'create').mockResolvedValue({
      id: 'some-author-id',
      name: authorStub().name,
    });

    result = await authorService.add({ ...authorStub() });
  });

  it('should call create method', () => {
    expect(Author.create).toHaveBeenCalled();
  });

  it('should call create method with correct parameters', () => {
    expect(Author.create).toHaveBeenCalledWith(
      { ...authorStub() },
      { include: [Movie] },
    );
  });

  it('should return created author object with id', () => {
    expect(result).toStrictEqual({
      id: 'some-author-id',
      name: authorStub().name,
    });
  });

  it('should throw error if async request error', async () => {
    jest.spyOn(Author, 'create').mockRejectedValue('async error');

    await expect(authorService.add({ ...authorStub() })).rejects.toEqual(
      new Error('async error'),
    );
  });
});

describe('update author', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Author, 'update').mockResolvedValue([1]);

    result = await authorService.update('some-author-id', {
      ...authorStub(),
      id: 'some-author-id',
    });
  });

  it('should call update method', () => {
    expect(Author.update).toHaveBeenCalled();
  });

  it('should call update method with correct parameters', () => {
    expect(Author.update).toHaveBeenCalledWith(
      {
        ...authorStub(),
        id: 'some-author-id',
      },
      { where: { id: 'some-author-id' } },
    );
  });

  it('should return true if update process succeeded', () => {
    expect(result).toBeTruthy();
  });

  it('should return error if the author data to be updated is not found', async () => {
    jest.spyOn(Author, 'update').mockResolvedValueOnce([0]);

    await expect(
      authorService.update('some-author-id', {
        ...authorStub(),
        id: 'some-author-id',
      }),
    ).rejects.toEqual(new Error('data not found'));
  });
});

describe('delete author', () => {
  let result = {};

  beforeEach(async () => {
    jest.spyOn(Author, 'destroy').mockResolvedValue(1);

    result = await authorService.delete('some-author-id');
  });

  it('should call destroy method', () => {
    expect(Author.destroy).toHaveBeenCalled();
  });

  it('should call destroy method with correct parameters', () => {
    expect(Author.destroy).toHaveBeenCalledWith({
      where: { id: 'some-author-id' },
    });
  });

  it('should return true if delete process succeeded', () => {
    expect(result).toStrictEqual(true);
  });

  it('should return error if the author data to be updated is not found', async () => {
    jest.spyOn(Author, 'destroy').mockResolvedValueOnce(0);

    await expect(authorService.delete('some-author-id')).rejects.toEqual(
      new Error('data not found'),
    );
  });
});
