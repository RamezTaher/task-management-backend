import { Consultant } from './entities/Consultant';
import { Client } from './entities/Client';
import { Intervention } from './entities/Intervention';
import { Ticket } from './entities/Ticket';
import { Task } from './entities/Task';
import { Admin } from './entities/Admin';
import { InterventionType } from './entities/InterventionType';

const entities = [
  Consultant,
  Client,
  Intervention,
  Ticket,
  Task,
  Admin,
  InterventionType,
];

export default entities;

export {
  Consultant,
  Client,
  Intervention,
  Ticket,
  Task,
  Admin,
  InterventionType,
};
