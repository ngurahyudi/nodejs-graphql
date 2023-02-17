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
import Actor from '../../actor/entity/actor.entity';
import Movie from '../../movie/entity/movie.entity';

@Table({
  tableName: 'movie_actor',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export default class MovieActor extends Model {
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
  @ForeignKey(() => Actor)
  @IsUUID(4)
  @Column(DataType.UUID)
  actorId: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  deletedAt?: Date;
}
