import { Consultant } from './entities/Consultant';
import { Client } from './entities/Client';
import { Intervention } from './entities/Intervention';
import { Ticket } from './entities/Ticket';
import { Task } from './entities/Task';
import { Admin } from './entities/Admin';

const entities = [Consultant, Client, Intervention, Ticket, Task, Admin];

export default entities;

export { Consultant, Client, Intervention, Ticket, Task, Admin };
