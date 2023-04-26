import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultantsModule } from './consultants/consultants.module';
import { AuthModule } from './auth/auth.module';
import entities from './utils/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule } from './clients/clients.module';
import { InterventionsModule } from './interventions/interventions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'containers-us-west-54.railway.app',
      port: 5992,
      username: 'root',
      password: 'uTHkmkjU397FJn4W1Xe9',
      database: 'railway',
      entities,
      synchronize: true,
      logging: false,
    }),

    ConsultantsModule,
    AuthModule,
    ClientsModule,
    InterventionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
