import { CreateMovieDto } from '../../movie/dto';

export class CreateAuthorDto {
  name: string;
  movies?: CreateMovieDto[];
}
