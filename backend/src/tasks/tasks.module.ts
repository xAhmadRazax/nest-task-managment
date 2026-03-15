import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { BlacklistTokenService } from 'src/auth/blacklist-token.service';
import { BlacklistTokens } from 'src/auth/entities/blackListToken.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, BlacklistTokens, User])],
  providers: [TasksService, BlacklistTokenService, UsersService],
  controllers: [TasksController],
})
export class TasksModule {}
