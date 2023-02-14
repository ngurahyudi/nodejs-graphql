import 'reflect-metadata';
import {
  Column,
  DataType,
  Default,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

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
}
