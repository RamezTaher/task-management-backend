import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/helpers';
import { Admin } from 'src/utils/typeorm';
import { FindClientParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { createAdminDto } from './dtos/CreateAdmin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}
  async findAdmin(findAdminParams: FindClientParams): Promise<Admin> {
    return this.adminRepository.findOne(findAdminParams);
  }
  async createAdmin(createAdmin: createAdminDto): Promise<Admin> {
    const existingAdmin = await this.adminRepository.findOne({
      email: createAdmin.email,
    });
    if (existingAdmin)
      throw new HttpException('Admin already exists', HttpStatus.CONFLICT);
    const password = await hashPassword(createAdmin.password);
    const newAdmin = this.adminRepository.create({
      ...createAdmin,
      password,
    });
    return this.adminRepository.save(newAdmin);
  }
}
