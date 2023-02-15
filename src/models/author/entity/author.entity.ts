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
import MovieAuthor from '../../movie-author/entity/movie-author.entity';

@Table({
  tableName: 'authors',
  timestamps: true,
  paranoid: true,
})
export default class Author extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @NotEmpty
  @Column(DataType.STRING(50))
  name: string;

  @Column(DataType.DATE)
  deletedAt?: Date;

  @BelongsToMany(() => Movie, () => MovieAuthor)
  movies: Movie[];
}
