import { Module } from '@nestjs/common';
import { ConsultantsService } from './consultants.service';
import { ConsultantsController } from './consultants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultant } from 'src/utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Consultant])],
  controllers: [ConsultantsController],
  providers: [ConsultantsService],
  exports: [ConsultantsService],
})
export class ConsultantsModule {}
