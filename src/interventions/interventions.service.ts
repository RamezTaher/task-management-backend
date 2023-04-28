import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultant, Intervention } from 'src/utils/typeorm';
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
    user: Consultant,
    createInterventionDto: CreateInterventionDto,
  ): Promise<Intervention> {
    const newIntervention = this.interventionRepository.create({
      ...createInterventionDto,
      consultant: user,
    });

    const savedIntervention = await this.interventionRepository.save(
      newIntervention,
    );
    return savedIntervention;
  }

  async updateIntervention(interventionId: number, updateIntervention: any) {
    const intervention = await this.interventionRepository.findOne(
      interventionId,
    );
    if (!intervention)
      throw new HttpException(
        'No Intervention Founded With Such ID',
        HttpStatus.BAD_REQUEST,
      );
    intervention.description =
      updateIntervention.description || intervention.description;
    intervention.startDate =
      updateIntervention.startDate || intervention.startDate;
    intervention.endDate = updateIntervention.endDate || intervention.endDate;
    intervention.status = updateIntervention.status || intervention.status;

    this.interventionRepository.save(intervention);
    return {
      success: true,
      statusCode: 200,
      message: 'Intervention Updated Successfully',
    };
  }

  async getInterventionById(interventionId: number): Promise<Intervention> {
    const intervention = await this.interventionRepository.findOne({
      relations: ['consultant'],
      where: { id: interventionId },
    });

    if (!intervention) {
      throw new NotFoundException(
        `Intervention with ID ${interventionId} not found`,
      );
    }

    return intervention;
  }

  async getInterventionsByConsultant(
    user: Consultant,
  ): Promise<Intervention[]> {
    const interventions = await this.interventionRepository.find({
      where: { consultant: user.id },
    });

    return interventions;
  }

  async deleteInterventionById(interventionId: number) {
    const result = await this.interventionRepository.delete(interventionId);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Intervention with ID ${interventionId} not found`,
      );
    }
    return {
      success: true,
      statusCode: 200,
      message: 'Intervention Deleted Successfully',
    };
  }
}
