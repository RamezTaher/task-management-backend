import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConsultantsModule } from 'src/consultants/consultants.module';
import { PassportModule } from '@nestjs/passport';
import { ConsultantStrategy } from './utils/ConsultantStrategy';
import { ClientsModule } from 'src/clients/clients.module';
import { ClientStrategy } from './utils/ClientStrategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/JwtStrategy';

@Module({
  imports: [
    ConsultantsModule,
    ClientsModule,
    JwtModule.register({
      secret: 'asasasasasasasasas',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [AuthController],
  providers: [ConsultantStrategy, AuthService, ClientStrategy, JwtStrategy],
})
export class AuthModule {}
