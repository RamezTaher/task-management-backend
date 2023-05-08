import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultantsModule } from './consultants/consultants.module';
import { AuthModule } from './auth/auth.module';
import entities from './utils/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule } from './clients/clients.module';
import { InterventionsModule } from './interventions/interventions.module';
import { TicketsModule } from './tickets/tickets.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'containers-us-west-116.railway.app',
      port: 6894,
      username: 'root',
      password: 'ZvTspzLLzy973w7akA1J',
      database: 'railway',
      entities,
      synchronize: true,
    }),
    ConsultantsModule,
    AuthModule,
    ClientsModule,
    InterventionsModule,
    TicketsModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
