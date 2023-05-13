import { Module } from '@nestjs/common';
import { InterventionsTypesController } from './interventions-types.controller';
import { InterventionsTypesService } from './interventions-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterventionType } from 'src/utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([InterventionType])],
  controllers: [InterventionsTypesController],
  providers: [InterventionsTypesService],
  exports: [InterventionsTypesService],
})
export class InterventionsTypesModule {}
