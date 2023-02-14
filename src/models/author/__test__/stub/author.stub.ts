import { CreateAuthorDto } from '../../dto/create-author.dto';

export const authorStub = (): CreateAuthorDto => ({
  name: 'author-name',
});
