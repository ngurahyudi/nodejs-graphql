import 'reflect-metadata';
import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Movie from '../../movie/entity/movie.entity';
import MovieActor from '../../movie-actor/entity/movie-actor.entity';

@Table({
  tableName: 'actors',
  timestamps: true,
  paranoid: true,
})
export default class Actor extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @NotEmpty
  @Column(DataType.STRING(50))
  name: string;

  @Column(DataType.DATE)
  deletedAt?: Date;

  @BelongsToMany(() => Movie, () => MovieActor)
  movies: Movie[];
}
