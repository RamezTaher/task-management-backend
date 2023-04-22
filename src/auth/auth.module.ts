import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConsultantsModule } from 'src/consultants/consultants.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/ConsultantStrategy';
import { ConsultantSerializer } from './utils/ConsultantSerializer';

@Module({
  imports: [ConsultantsModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [LocalStrategy, ConsultantSerializer, AuthService],
})
export class AuthModule {}
