import { Module } from '@nestjs/common';
import { InterventionsController } from './interventions.controller';
import { InterventionsService } from './interventions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intervention } from 'src/utils/typeorm';
import { InterventionsTypesModule } from 'src/interventions-types/interventions-types.module';

@Module({
  imports: [TypeOrmModule.forFeature([Intervention]), InterventionsTypesModule],
  controllers: [InterventionsController],
  providers: [InterventionsService],
  exports: [InterventionsService],
})
export class InterventionsModule {}
