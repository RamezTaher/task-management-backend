import { Consultant } from './typeorm';

export type FindConsultantParams = Partial<{
  email: string;
  id: number;
}>;
export type FindClientParams = Partial<{
  email: string;
  id: number;
}>;

export type LoginConsultantParams = {
  email: string;
  password: string;
};
export type LoginClientParams = {
  email: string;
  password: string;
};

export interface AuthenticatedRequest extends Request {
  user: Consultant;
}
