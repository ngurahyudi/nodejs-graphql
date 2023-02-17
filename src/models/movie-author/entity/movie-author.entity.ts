import 'reflect-metadata';
import {
  AllowNull,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Author from '../../author/entity/author.entity';
import Movie from '../../movie/entity/movie.entity';

@Table({
  tableName: 'movie_author',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export default class MovieAuthor extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @ForeignKey(() => Movie)
  @IsUUID(4)
  @Column(DataType.UUID)
  movieId: string;

  @AllowNull(false)
  @ForeignKey(() => Author)
  @IsUUID(4)
  @Column(DataType.UUID)
  authorId: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  deletedAt?: Date;
}
