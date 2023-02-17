import 'reflect-metadata';
import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Movie from '../../movie/entity/movie.entity';
import MovieAuthor from '../../movie-author/entity/movie-author.entity';

@Table({
  tableName: 'authors',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export default class Author extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  name: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  deletedAt?: Date;

  @BelongsToMany(() => Movie, () => MovieAuthor)
  movies: Movie[];
}
