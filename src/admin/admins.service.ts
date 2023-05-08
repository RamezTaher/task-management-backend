import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/utils/typeorm';
import { FindClientParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}
  async findAdmin(findAdminParams: FindClientParams): Promise<Admin> {
    return this.adminRepository.findOne(findAdminParams);
  }
}
