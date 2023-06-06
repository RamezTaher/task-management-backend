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
import { InterventionsTypesService } from 'src/interventions-types/interventions-types.service';

@Injectable()
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention)
    private readonly interventionRepository: Repository<Intervention>,
    private readonly interventionsTypesService: InterventionsTypesService,
  ) {}

  async createIntervention(
    user: Consultant,
    createInterventionDto: CreateInterventionDto,
  ): Promise<Intervention> {
    const interventionType =
      await this.interventionsTypesService.getInterventionTypeById(
        createInterventionDto.interventionTypeId,
      );
    const newIntervention = this.interventionRepository.create({
      startDate: createInterventionDto.startDate,
      endDate: createInterventionDto.endDate,
      consultant: user,
      interventionType,
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
    intervention.startDate =
      updateIntervention.startDate || intervention.startDate;
    intervention.endDate = updateIntervention.endDate || intervention.endDate;
    intervention.status = updateIntervention.status || intervention.status;
    intervention.accepted_by =
      updateIntervention.accepted_by || intervention.accepted_by;

    this.interventionRepository.save(intervention);
    return {
      success: true,
      statusCode: 200,
      message: 'Intervention Updated Successfully',
    };
  }

  async getInterventionById(interventionId: number): Promise<Intervention> {
    const intervention = await this.interventionRepository.findOne({
      relations: ['consultant', 'interventionType'],
      where: { id: interventionId },
    });

    if (!intervention) {
      throw new NotFoundException(
        `Intervention with ID ${interventionId} not found`,
      );
    }

    return intervention;
  }
  async getAllInterventions(status?: string): Promise<Intervention[]> {
    let queryBuilder = this.interventionRepository
      .createQueryBuilder('intervention')
      .leftJoinAndSelect('intervention.consultant', 'consultant')
      .leftJoinAndSelect('intervention.interventionType', 'interventionType');

    if (status) {
      queryBuilder = queryBuilder.andWhere('intervention.status = :status', {
        status,
      });
    }

    return await queryBuilder.getMany();
  }
  async getAllInterventionsAccptedBy(
    status?: string,
    accepted_by?: string,
  ): Promise<Intervention[]> {
    let queryBuilder = this.interventionRepository
      .createQueryBuilder('intervention')
      .leftJoinAndSelect('intervention.consultant', 'consultant')
      .leftJoinAndSelect('intervention.interventionType', 'interventionType')
      .where('intervention.accepted_by=:accepted', { accepted: accepted_by });

    if (status) {
      queryBuilder = queryBuilder.andWhere('intervention.status = :status', {
        status,
      });
    }

    return await queryBuilder.getMany();
  }

  async getInterventionsByConsultant(
    consultant: Consultant,
    status?: string,
  ): Promise<Intervention[]> {
    let queryBuilder = this.interventionRepository
      .createQueryBuilder('intervention')
      .leftJoin('intervention.consultant', 'consultant')
      .leftJoinAndSelect('intervention.interventionType', 'interventionType')
      .where('intervention.consultant.id = :id', { id: consultant.id });

    if (status) {
      queryBuilder = queryBuilder.andWhere('intervention.status = :status', {
        status,
      });
    }

    return await queryBuilder.getMany();
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
