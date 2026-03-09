import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { MoreThan, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import bcrypt from 'bcryptjs';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dtos/change-password.dto';
import crypto from 'crypto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

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

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.findMe(userId);

    if (!user) {
      throw new UnauthorizedException('user no longer exist');
    }

    if (
      !(await this.comparePassword(
        changePasswordDto.currentPassword,
        user.password,
      ))
    ) {
      throw new UnauthorizedException('Password is wrong');
    }

    const hashedPassword = await this.hashPassword(
      changePasswordDto.newPassword,
    );
    user.password = hashedPassword;
    user.passwordChangedAt = new Date();

    await this.userRepo.save(user);
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findOne(email);
    if (!user) {
      return;
    }

    const passwordResetToken = crypto.randomBytes(32).toString('hex');
    const hashedPasswordToken = crypto
      .createHash('sha256')
      .update(passwordResetToken)
      .digest('hex');

    user.passwordResetToken = hashedPasswordToken;
    user.passwordResetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
    user.passwordChangedAt = new Date();

    await this.userRepo.save(user);

    return passwordResetToken;
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto) {
    const hashedPasswordResetToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await this.userRepo.findOne({
      where: {
        passwordResetToken: hashedPasswordResetToken,
        passwordResetTokenExpiry: MoreThan(new Date()),
      },
    });

    if (!user) {
      throw new BadRequestException('invalid token or token expires');
    }

    user.password = await this.hashPassword(resetPasswordDto.password);
    user.passwordResetToken = null;
    user.passwordResetTokenExpiry = null;
    user.passwordChangedAt = new Date();
    return this.userRepo.save(user);
  }

  findMe(id: string) {
    return this.userService.findById(id);
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
