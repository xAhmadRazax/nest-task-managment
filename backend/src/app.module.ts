import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/database.config';
import { appConfigSchema } from './config/config.types';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeConfigService } from './config/type-config.service';
import { User } from './users/entities/user.entity';
import { jwtConfig } from './config/jwt.confiq';
import { BlacklistTokens } from './auth/entities/blackListToken.entity';
import { Task } from './tasks/entities/task.entity';
import { APP_FILTER } from '@nestjs/core';
import { DbExceptionFilter } from './filters/db.exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [typeOrmConfig, jwtConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: TypeConfigService) => ({
        ...(await configService.get('database')),
        entities: [User, BlacklistTokens, Task],
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: DbExceptionFilter,
    },
  ],
})
export class AppModule {}
