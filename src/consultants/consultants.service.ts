import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async saveConsultant(consultant: Consultant) {
    return this.consultantRepository.save(consultant);
  }
}
