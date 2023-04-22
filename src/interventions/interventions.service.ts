import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Intervention } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateInterventionDto } from './dtos/CreateIntervention.dto';
import { instanceToPlain } from 'class-transformer';

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
}
