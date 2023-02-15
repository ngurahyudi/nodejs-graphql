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
import Actor from '../../actor/entity/actor.entity';
import Movie from '../../movie/entity/movie.entity';

@Table({
  tableName: 'movie_actor',
  timestamps: true,
  paranoid: true,
})
export default class MovieActor extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Movie)
  @Column(DataType.UUID)
  movieId: string;

  @ForeignKey(() => Actor)
  @Column(DataType.UUID)
  actorId: string;
}
