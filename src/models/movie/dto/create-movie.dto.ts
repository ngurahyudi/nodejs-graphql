import { CreateActorDto } from '../../actor/dto';
import { CreateAuthorDto } from '../../author/dto';

export class CreateMovieDto {
  name: string;
  authors?: CreateAuthorDto[];
  actors?: CreateActorDto[];
}
