import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import type { Response } from 'express';
import { CreateTaskDto } from './dtos/createTask.dto';
import { GetUserId } from 'src/common/decorators/get-userId.decorator';
import { CreateSubtaskDto } from './dtos/create-subtasks.dto';
import { ChangeTaskStatusDto } from './dtos/change-task-status.dto';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('/')
  findAllTask(@GetUserId() id: string) {
    return this.taskService.findAll(id);
  }
  @Get('/:taskId')
  findTask(
    @GetUserId() id: string,
    @Param('taskId') { taskId }: { taskId: string },
  ) {
    return this.taskService.findOne(id, taskId);
  }

  @Post('/')
  createTask(@GetUserId() id: string, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(id, createTaskDto);
  }

  @Post('/:id/subTasks')
  addSubTasks(
    @GetUserId() userId: string,
    @Body() createSubtaskDto: CreateSubtaskDto[],
    @Param('id') { id }: { id: string },
  ) {
    return this.taskService.addSubTasks(userId, id, createSubtaskDto);
  }

  @Patch('/:id/status')
  changeTaskStatus(
    @GetUserId() userId: string,
    @Param('id') { id }: { id: string },
    @Body() { newStatus }: ChangeTaskStatusDto,
  ) {
    return this.taskService.changeTaskStatus(userId, id, newStatus);
  }
}
