import { Module } from '@nestjs/common';
import { InterventionsController } from './interventions.controller';
import { InterventionsService } from './interventions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intervention } from 'src/utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Intervention])],
  controllers: [InterventionsController],
  providers: [InterventionsService],
  exports: [InterventionsService],
})
export class InterventionsModule {}
