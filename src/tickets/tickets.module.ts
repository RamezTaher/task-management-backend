import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultant, Ticket } from 'src/utils/typeorm';
import { ConsultantsModule } from 'src/consultants/consultants.module';
import { ConsultantsService } from 'src/consultants/consultants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Consultant, Ticket]), ConsultantsModule],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
