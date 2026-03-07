import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly round = 12;
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly UserService: UsersService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    return this.UserService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.round);
    return hashedPassword;
  }

  private async comparePassword(
    password: string,
    candidatePassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, candidatePassword);
  }
}
