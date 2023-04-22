import { Session } from './entities/Session';
import { Consultant } from './entities/Consultant';
import { Client } from './entities/Client';
import { Intervention } from './entities/Intervention';

const entities = [Consultant, Session, Client, Intervention];

export default entities;

export { Consultant, Session, Client, Intervention };
