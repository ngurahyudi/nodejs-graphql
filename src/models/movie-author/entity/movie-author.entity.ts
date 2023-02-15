import 'reflect-metadata';
import {
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Author from '../../author/entity/author.entity';
import Movie from '../../movie/entity/movie.entity';

@Table({
  tableName: 'movie_author',
  timestamps: true,
  paranoid: true,
})
export default class MovieAuthor extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Movie)
  @Column(DataType.UUID)
  movieId: string;

  @ForeignKey(() => Author)
  @Column(DataType.UUID)
  authorId: string;
}
