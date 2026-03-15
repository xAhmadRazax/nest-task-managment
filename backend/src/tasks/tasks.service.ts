import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeepPartial, IsNull, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/createTask.dto';
import { TaskStatus } from './types/task.type';
import { CreateSubtaskDto } from './dtos/create-subtasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {}

  findAll(userId: string) {
    return this.taskRepo.find({
      where: { user: { id: userId }, parent: IsNull() },
      relations: ['subTasks', 'subTasks.user', 'user'],
    });
  }

  async findOne(userId: string, id: string) {
    const task = await this.taskRepo.findOne({
      where: {
        id,
        user: { id: userId },
      },
      relations: ['subTasks', 'subTasks.user', 'user'],
    });

    if (!task) {
      throw new NotFoundException('Task no longer exists.');
    }
    return task;
  }

  async create(userId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepo.save({
      ...createTaskDto,
      user: { id: userId },
    });

    if (createTaskDto.subTasks && createTaskDto.subTasks.length > 0) {
      const subTasks = this.addRelationalData(
        userId,
        createTaskDto.subTasks,
        task,
      );
      await this.taskRepo.save(subTasks);
    }

    return this.findOne(userId, task.id);
  }

  async addSubTasks(
    userId: string,
    taskId: string,
    subTasks: CreateSubtaskDto[],
  ) {
    const task = await this.findOne(userId, taskId);
    const subTaskWithAllRelationalInfo = this.addRelationalData(
      userId,
      subTasks,
      task,
    );

    return this.taskRepo.save(subTaskWithAllRelationalInfo);
  }

  async changeTaskStatus(userId: string, taskId: string, status: TaskStatus) {
    const task = await this.findOne(userId, taskId);

    const taskWithUpdatedState = this.stateTransition(task, status);

    return this.taskRepo.save(taskWithUpdatedState);
  }

  private validTransition(
    currentStatus: TaskStatus,
    newStatus: TaskStatus,
  ): never | true {
    const statusValidTransition: Record<TaskStatus, TaskStatus[]> = {
      [TaskStatus.OPEN]: [TaskStatus.IN_PROGRESS, TaskStatus.ABANDONED],
      [TaskStatus.IN_PROGRESS]: [
        TaskStatus.DONE,
        TaskStatus.FAILED,
        TaskStatus.ABANDONED,
      ],
      [TaskStatus.DONE]: [],
      [TaskStatus.FAILED]: [TaskStatus.OPEN, TaskStatus.IN_PROGRESS],
      [TaskStatus.ABANDONED]: [TaskStatus.OPEN],
    };

    if (!statusValidTransition[currentStatus].includes(newStatus)) {
      throw new BadRequestException(
        `Cannot transition from ${currentStatus} to ${newStatus}`,
      );
    }
    return true;
  }

  private stateTransition(task: Task, newStatus: TaskStatus) {
    if (
      newStatus === TaskStatus.DONE ||
      (newStatus === TaskStatus.ABANDONED &&
        task.subTasks.length > 0 &&
        this.validTransition(task.status, newStatus))
    ) {
      task.subTasks.map((subtask) => {
        // if subTask state is not equal Done change
        if (
          subtask.status === TaskStatus.OPEN ||
          subtask.status === TaskStatus.IN_PROGRESS
        ) {
          subtask.status = TaskStatus.ABANDONED;
        }
        // else change it to ABOUNDED
        return subtask;
      });
    } else if (
      newStatus === TaskStatus.FAILED &&
      task.subTasks.length > 0 &&
      this.validTransition(task.status, newStatus)
    ) {
      task.subTasks.map((subtask) => {
        // if subTask state is not equal Done change
        if (
          subtask.status === TaskStatus.OPEN ||
          subtask.status === TaskStatus.IN_PROGRESS
        ) {
          subtask.status = TaskStatus.FAILED;
        }
        // else change it to ABOUNDED
        return subtask;
      });
    }

    this.validTransition(task.status, newStatus);
    task.status = newStatus;
    return task;
  }

  private addRelationalData(
    userId: string,
    tasks: CreateSubtaskDto[],
    parentTask: Task,
  ) {
    return tasks.map((subTask: Task): DeepPartial<Task> => {
      const taskEntity = this.taskRepo.create(subTask);
      return {
        ...taskEntity,
        user: { id: userId },
        parent: parentTask,
      };
    });
  }
}
