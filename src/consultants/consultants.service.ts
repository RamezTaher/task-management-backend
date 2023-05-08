import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultant } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/helpers';
import { CreateConsultantDto } from 'src/auth/dtos/CreateConsultant.dto';
import { FindConsultantParams } from 'src/utils/types';

@Injectable()
export class ConsultantsService {
  constructor(
    @InjectRepository(Consultant)
    private readonly consultantRepository: Repository<Consultant>,
  ) {}
  async createConsultant(
    createConsultantDto: CreateConsultantDto,
  ): Promise<Consultant> {
    const existingConsultant = await this.consultantRepository.findOne({
      email: createConsultantDto.email,
    });
    if (existingConsultant)
      throw new HttpException('Consultant already exists', HttpStatus.CONFLICT);
    const password = await hashPassword(createConsultantDto.password);
    const newConsultant = this.consultantRepository.create({
      ...createConsultantDto,
      password,
    });
    return this.consultantRepository.save(newConsultant);
  }

  async findConsultant(
    findConsultantParams: FindConsultantParams,
  ): Promise<Consultant> {
    return this.consultantRepository.findOne(findConsultantParams);
  }
  async getAllConsultants(): Promise<Consultant[]> {
    return this.consultantRepository.find();
  }

  async getConsultantById(consultantId: number): Promise<Consultant> {
    const consultant = await this.consultantRepository.findOne({
      // relations: ['consultant', 'tasks'],
      where: { id: consultantId },
    });

    if (!consultant) {
      throw new NotFoundException(`Consultant with ID ${consultant} not found`);
    }

    return consultant;
  }

  async updateConsultant(
    consultantId: number,
    updateConsultant: Partial<Consultant>,
  ) {
    const consultant = await this.consultantRepository.findOne(consultantId);
    if (!consultant)
      throw new HttpException(
        'No consultant Founded With Such ID',
        HttpStatus.BAD_REQUEST,
      );
    const updatedConsultant = Object.assign(consultant, updateConsultant);

    this.consultantRepository.save(updatedConsultant);
    return {
      success: true,
      statusCode: 200,
      message: 'Consultant Updated Successfully',
    };
  }

  async deleteConsultantById(consultantId: number) {
    const result = await this.consultantRepository.delete(consultantId);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Consultant with ID ${consultantId} not found`,
      );
    }
    return {
      success: true,
      statusCode: 200,
      message: 'Consultant Deleted Successfully',
    };
  }
}
