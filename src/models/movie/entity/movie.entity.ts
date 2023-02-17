import 'reflect-metadata';
import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  IsUUID,
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
  underscored: true,
  paranoid: true,
})
export default class Movie extends Model {
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

  @BelongsToMany(() => Author, () => MovieAuthor)
  authors: Author[];

  @BelongsToMany(() => Actor, () => MovieActor)
  actors: Actor[];
}
