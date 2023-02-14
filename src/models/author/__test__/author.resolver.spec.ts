import 'reflect-metadata';
import { AuthorService } from '../author.service';
import { AuthorResolver } from '../resolver/author.resolver';
import { authorStub } from './stub/author.stub';
import Author from '../entity/author.entity';

jest.mock('../author.service.ts');

const mockFind = jest.fn();
const mockFindOne = jest.fn();
const mockAdd = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

(AuthorService as jest.Mock).mockImplementation(() => {
  return {
    find: mockFind,
    findOne: mockFindOne,
    add: mockAdd,
    update: mockUpdate,
    delete: mockDelete,
  };
});

describe('list authors', () => {
  const authorResolver = new AuthorResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(authorResolver.authorService, 'find').mockResolvedValue([
      {
        id: 'author-id',
        name: authorStub().name,
      },
    ] as unknown as Author[]);

    result = await authorResolver.getAuthors();
  });

  it('should call find method', () => {
    expect(mockFind).toHaveBeenCalled();
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual([
      {
        id: 'author-id',
        name: authorStub().name,
      },
    ]);
  });
});

describe('find author', () => {
  const authorResolver = new AuthorResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(authorResolver.authorService, 'findOne').mockResolvedValue({
      id: 'author-id',
      name: authorStub().name,
    } as unknown as Author);

    result = await authorResolver.findAuthor('some-author-id');
  });

  it('should call findOne method', () => {
    expect(mockFindOne).toHaveBeenCalled();
  });

  it('should call findOne method with correct parameters', () => {
    expect(mockFindOne).toHaveBeenCalledWith('some-author-id');
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual({
      id: 'author-id',
      name: authorStub().name,
    });
  });
});

describe('add author', () => {
  const authorResolver = new AuthorResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(authorResolver.authorService, 'add').mockResolvedValue({
      id: 'author-id',
      name: authorStub().name,
    } as unknown as Author);

    result = await authorResolver.addAuthor({ ...authorStub() });
  });

  it('should call add method', () => {
    expect(mockAdd).toHaveBeenCalled();
  });

  it('should call add method with correct parameters', () => {
    expect(mockAdd).toHaveBeenCalledWith({ ...authorStub() });
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual({
      id: 'author-id',
      name: authorStub().name,
    });
  });
});

describe('update author', () => {
  const authorResolver = new AuthorResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(authorResolver.authorService, 'update').mockResolvedValue({
      id: 'author-id',
      name: authorStub().name,
    });

    result = await authorResolver.updateAuthor('some-author-id', {
      ...authorStub(),
      id: 'some-author-id',
    });
  });

  it('should call update method', () => {
    expect(mockUpdate).toHaveBeenCalled();
  });

  it('should call update method with correct parameters', () => {
    expect(mockUpdate).toHaveBeenCalledWith('some-author-id', {
      ...authorStub(),
      id: 'some-author-id',
    });
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual({
      id: 'author-id',
      name: authorStub().name,
    });
  });
});

describe('delete author', () => {
  const authorResolver = new AuthorResolver();

  let result = {};

  beforeEach(async () => {
    jest.spyOn(authorResolver.authorService, 'delete').mockResolvedValue(true);

    result = await authorResolver.deleteAuthor('some-author-id');
  });

  it('should call delete method', () => {
    expect(mockDelete).toHaveBeenCalled();
  });

  it('should call delete method with correct parameters', () => {
    expect(mockDelete).toHaveBeenCalledWith('some-author-id');
  });

  it(`should return appropriate results`, () => {
    expect(result).toStrictEqual(true);
  });
});
