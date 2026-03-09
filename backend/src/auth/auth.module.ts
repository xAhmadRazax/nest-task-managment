import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeConfigService } from 'src/config/type-config.service';
import { BlacklistTokenService } from './blacklist-token.service';
import { BlacklistTokens } from './entities/blackListToken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, BlacklistTokens]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: TypeConfigService) => ({
        ...(await configService.get('jwt')),
      }),
    }),
    UsersModule,
  ],
  providers: [AuthService, BlacklistTokenService],
  controllers: [AuthController],
})
export class AuthModule {}
