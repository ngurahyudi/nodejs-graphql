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
import MovieActor from '../../movie-actor/entity/movie-actor.entity';

@Table({
  tableName: 'actors',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export default class Actor extends Model {
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

  @BelongsToMany(() => Movie, () => MovieActor)
  movies: Movie[];
}
