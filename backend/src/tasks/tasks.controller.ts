import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetUserId } from 'src/common/decorators/get-userId.decorator';
import { CreateSubtaskDto } from './dtos/create-subtasks.dto';
import { ChangeTaskStatusDto } from './dtos/change-task-status.dto';
import { UpdateTaskDto } from './dtos/update-task-dto';
import { FilterTaskDto } from './dtos/filter-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('/')
  findAllTask(@GetUserId() id: string, @Query() filters: FilterTaskDto) {
    return this.taskService.findAll(id, filters);
  }
  @Get('/:taskId')
  findTask(@GetUserId() id: string, @Param('taskId') taskId: string) {
    return this.taskService.findOne(id, taskId);
  }

  @Post('/')
  createTask(@GetUserId() id: string, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(id, createTaskDto);
  }

  @Patch('/:id')
  updateTask(
    @GetUserId() userId: string,
    @Param('id') id: string,
    @Body() UpdateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(userId, id, UpdateTaskDto);
  }

  @Post('/:id/subTasks')
  addSubTasks(
    @GetUserId() userId: string,
    @Body() createSubtaskDto: CreateSubtaskDto[],
    @Param('id') id: string,
  ) {
    return this.taskService.addSubTasks(userId, id, createSubtaskDto);
  }

  @Patch('/:id/status')
  changeTaskStatus(
    @GetUserId() userId: string,
    @Param('id') id: string,
    @Body() { newStatus }: ChangeTaskStatusDto,
  ) {
    return this.taskService.changeTaskStatus(userId, id, newStatus);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteTask(@Param('id') id: string) {
    await this.taskService.deleteTask(id);
  }
}
