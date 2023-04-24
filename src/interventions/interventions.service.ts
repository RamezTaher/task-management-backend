import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Intervention } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateInterventionDto } from './dtos/CreateIntervention.dto';
import { instanceToPlain } from 'class-transformer';
import { IntevrentionStatus } from 'src/utils/typeorm/entities/Intervention';

@Injectable()
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention)
    private readonly interventionRepository: Repository<Intervention>,
  ) {}

  async createIntervention(
    createInterventionDto: CreateInterventionDto,
  ): Promise<Intervention> {
    const newIntervention = this.interventionRepository.create({
      ...createInterventionDto,
      consultant: instanceToPlain(createInterventionDto.consultant),
    });

    const savedIntervention = await this.interventionRepository.save(
      newIntervention,
    );
    return savedIntervention;
  }

  async updateIntervention(interventionId: number, status: IntevrentionStatus) {
    const intervention = await this.interventionRepository.findOneOrFail(
      interventionId,
    );
    intervention.status = status;

    return this.interventionRepository.save(intervention);
  }
}
