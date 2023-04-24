import { Consultant } from './typeorm';
import { IntevrentionStatus } from './typeorm/entities/Intervention';

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

export type UpdateInterventionStatus = {
  status: IntevrentionStatus;
};

export interface AuthenticatedRequest extends Request {
  user: Consultant;
}
