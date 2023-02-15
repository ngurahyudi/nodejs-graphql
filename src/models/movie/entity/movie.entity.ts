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
import Actor from '../../actor/entity/actor.entity';
import Author from '../../author/entity/author.entity';
import MovieActor from '../../movie-actor/entity/movie-actor.entity';
import MovieAuthor from '../../movie-author/entity/movie-author.entity';

@Table({
  tableName: 'movies',
  timestamps: true,
  paranoid: true,
})
export default class Movie extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @NotEmpty
  @Column(DataType.STRING(50))
  name: string;

  @Column(DataType.DATE)
  deletedAt?: Date;

  @BelongsToMany(() => Author, () => MovieAuthor)
  authors: Author[];

  @BelongsToMany(() => Actor, () => MovieActor)
  actors: Actor[];
}
