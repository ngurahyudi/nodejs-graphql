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
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { RoleEnum } from '../enums';

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export default class User extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  name: string;

  @IsEmail
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(50))
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING(128))
  password: string;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  roles: RoleEnum[];

  @AllowNull(true)
  @Column(DataType.STRING(128))
  refreshToken?: string;

  @AllowNull(true)
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
