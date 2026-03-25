import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  findById(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  findOne(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
  //   idk about the things that i need for find filtering
  //   find(email: string) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepo.save(createUserDto);
  }
  delete(id: string) {
    return this.userRepo.delete(id);
  }
}
