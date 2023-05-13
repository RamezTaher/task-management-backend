import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterventionType } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateInterventionTypeDto } from './dtos/CreateInterventionType';

@Injectable()
export class InterventionsTypesService {
  constructor(
    @InjectRepository(InterventionType)
    private readonly interventionTypeRepository: Repository<InterventionType>,
  ) {}

  async getAllInterventionTypes(): Promise<InterventionType[]> {
    return await this.interventionTypeRepository.find();
  }

  async getInterventionTypeById(id: number): Promise<InterventionType> {
    const InterventionType = await this.interventionTypeRepository.findOne(id);
    if (!InterventionType) {
      throw new NotFoundException(`Intervention type with ID ${id} not found`);
    }
    return InterventionType;
  }

  async createInterventionType(
    interventionType: CreateInterventionTypeDto,
  ): Promise<InterventionType> {
    const newInterventionType = this.interventionTypeRepository.create({
      name: interventionType.name,
      description: interventionType.description,
    });

    return await this.interventionTypeRepository.save(newInterventionType);
  }

  async updateInterventionType(
    id: number,
    updateInterventionType: Partial<InterventionType>,
  ) {
    const interventionType = await this.interventionTypeRepository.findOne(id);
    if (!interventionType)
      throw new HttpException(
        'No Ticket Founded With Such ID',
        HttpStatus.BAD_REQUEST,
      );
    const updatedInterventionType = Object.assign(
      interventionType,
      updateInterventionType,
    );

    this.interventionTypeRepository.save(updatedInterventionType);
    return {
      success: true,
      statusCode: 200,
      message: 'InterventionType Updated Successfully',
    };
  }

  async deleteInterventionType(id: number) {
    const result = await this.interventionTypeRepository.delete(id);

    if (result.affected === 0) {
      throw new Error(`InterventionType with id ${id} not found`);
    }
    return {
      success: true,
      statusCode: 200,
      message: 'InterventionType Deleted Successfully',
    };
  }
}
