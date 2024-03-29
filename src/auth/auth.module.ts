import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConsultantsModule } from 'src/consultants/consultants.module';
import { PassportModule } from '@nestjs/passport';
import { ConsultantStrategy } from './utils/ConsultantStrategy';
import { ClientsModule } from 'src/clients/clients.module';
import { ClientStrategy } from './utils/ClientStrategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtClientStrategy } from './utils/JwtClientStrategy';
import { JwtConsultantStrategy } from './utils/JwtConsultantStrategy';
import { JwtAuthStrategy } from './utils/JwtAuthStrategy';
import { AdminsModule } from 'src/admin/admins.module';
import { JwtAdminStrategy } from './utils/JwtAdminStrategy';
import { AdminStrategy } from './utils/AdminStrategy';

@Module({
  imports: [
    ConsultantsModule,
    ClientsModule,
    AdminsModule,
    JwtModule.register({
      secret: 'asasasasasasasasas',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    ConsultantStrategy,
    AuthService,
    ClientStrategy,
    AdminStrategy,
    JwtClientStrategy,
    JwtConsultantStrategy,
    JwtAuthStrategy,
    JwtAdminStrategy,
  ],
})
export class AuthModule {}
