import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConsultantsModule } from 'src/consultants/consultants.module';
import { PassportModule } from '@nestjs/passport';
import { ConsultantStrategy } from './utils/ConsultantStrategy';
import { ConsultantSerializer } from './utils/ConsultantSerializer';
import { ClientsModule } from 'src/clients/clients.module';
import { ClientStrategy } from './utils/ClientStrategy';
import { ClientSerializer } from './utils/ClientSerializer';

@Module({
  imports: [
    ConsultantsModule,
    ClientsModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [
    ConsultantStrategy,
    ConsultantSerializer,
    AuthService,
    ClientStrategy,
    ClientSerializer,
  ],
})
export class AuthModule {}
