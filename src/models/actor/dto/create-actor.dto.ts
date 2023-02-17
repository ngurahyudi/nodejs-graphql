import { CreateMovieDto } from '../../movie/dto';

export class CreateActorDto {
  name: string;
  movies?: CreateMovieDto[];
}
