import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getAllClient(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async getClientById(clientId: number): Promise<Client> {
    const client = await this.clientRepository.findOne({
      // relations: ['consultant', 'tasks'],
      where: { id: clientId },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${client} not found`);
    }

    return client;
  }

  async updateClient(clientId: number, updateClient: Partial<Client>) {
    const client = await this.clientRepository.findOne(clientId);
    if (!client)
      throw new HttpException(
        'No client Founded With Such ID',
        HttpStatus.BAD_REQUEST,
      );
    const updatedClient = Object.assign(client, updateClient);

    this.clientRepository.save(updatedClient);
    return {
      success: true,
      statusCode: 200,
      message: 'Client Updated Successfully',
    };
  }

  async deleteClientById(clientId: number) {
    const result = await this.clientRepository.delete(clientId);

    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }
    return {
      success: true,
      statusCode: 200,
      message: 'Client Deleted Successfully',
    };
  }
}
