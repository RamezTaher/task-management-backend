import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from 'src/auth/dtos/CreateClient.dto';
import { hashPassword } from 'src/utils/helpers';
import { Client } from 'src/utils/typeorm';
import { FindClientParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const existingClient = await this.clientRepository.findOne({
      email: createClientDto.email,
    });
    if (existingClient)
      throw new HttpException('Client already exists', HttpStatus.CONFLICT);
    const password = await hashPassword(createClientDto.password);
    const newClient = this.clientRepository.create({
      ...createClientDto,
      password,
    });
    return this.clientRepository.save(newClient);
  }

  async findClient(findClientParams: FindClientParams): Promise<Client> {
    return this.clientRepository.findOne(findClientParams);
  }

  async saveConsultant(client: Client) {
    return this.clientRepository.save(client);
  }
}
