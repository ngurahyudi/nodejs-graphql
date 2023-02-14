import { Request, Response } from 'express';
import User from '../../models/user/entity/user.entity';

export interface AppContext {
  req: Request;
  res: Response;
  userId: string;
}
