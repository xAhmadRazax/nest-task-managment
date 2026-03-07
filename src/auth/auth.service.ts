import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import bcrypt from 'bcryptjs';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly round = 12;
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(userDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(userDto.password);
    return this.userService.create({
      ...userDto,
      password: hashedPassword,
    });
  }

  async loginUser(
    userDto: LoginUserDto,
  ): Promise<{ accessToken: string; user: User }> {
    const user = await this.userService.findOne(userDto.email);
    if (
      !user ||
      !(await this.comparePassword(userDto.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid Credential');
    }

    const payload = { id: user.id, name: user.name, email: user.email };

    const token = await this.jwtService.signAsync(payload);
    return {
      accessToken: token,
      user: user,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.round);
    return hashedPassword;
  }

  private async comparePassword(
    candidatePassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
