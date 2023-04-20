import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/helpers';
import { FindUserParams } from 'src/utils/types';
import { CreateUserDto } from 'src/auth/dtos/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (existingUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const password = await hashPassword(createUserDto.password);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password,
    });
    return this.userRepository.save(newUser);
  }

  async findUser(findUserParams: FindUserParams): Promise<User> {
    return this.userRepository.findOne(findUserParams);
  }

  async saveUser(user: User) {
    return this.userRepository.save(user);
  }
}
