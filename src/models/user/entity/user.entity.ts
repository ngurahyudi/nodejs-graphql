import 'reflect-metadata';
import * as bcrypt from 'bcrypt';
import {
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Default,
  IsEmail,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { RoleEnum } from '../enums';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export default class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @NotEmpty
  @AllowNull(false)
  @Column(DataType.STRING(50))
  name: string;

  @NotEmpty
  @IsEmail
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(50))
  email: string;

  @NotEmpty
  @AllowNull(false)
  @Column(DataType.STRING(128))
  password: string;

  @NotEmpty
  @Column(DataType.ARRAY(DataType.STRING))
  roles: RoleEnum[];

  @AllowNull(true)
  @Column(DataType.STRING(128))
  refreshToken?: string;

  @Column(DataType.DATE)
  deletedAt?: Date;

  @BeforeCreate
  @BeforeUpdate
  static async encryptPassword(user: User) {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.get('password'), salt);

      user.set('password', hash);
    }
  }

  @BeforeCreate
  @BeforeUpdate
  static async encryptRefreshToken(user: User) {
    if (user.changed('refreshToken') && user.get('refreshToken') !== null) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.get('refreshToken'), salt);

      user.set('refreshToken', hash);
    }
  }
}
