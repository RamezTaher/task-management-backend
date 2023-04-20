import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [LocalStrategy, SessionSerializer, AuthService],
})
export class AuthModule {}
