import { User } from './typeorm';

export type FindUserParams = Partial<{
  email: string;
  id: number;
}>;

export type LoginUserParams = {
  email: string;
  password: string;
};

export interface AuthenticatedRequest extends Request {
  user: User;
}
