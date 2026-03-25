import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './types/task.type';
import { CreateSubtaskDto } from './dtos/create-subtasks.dto';
import { UpdateTaskDto } from './dtos/update-task-dto';
import { FilterTaskDto } from './dtos/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {}

  async findAll(userId: string, filters: FilterTaskDto) {
    const { skip, limit, search, status, sortBy, order } = filters;

    const qb = this.taskRepo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.subTasks', 'subTasks') // 👈 relations
      .leftJoinAndSelect('task.user', 'user')
      .where('task.userId = :userId', { userId })
      .andWhere('task.parentId IS NULL');

    if (search) {
      qb.andWhere(
        'task.title ILIKE :search OR task.description ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (status) {
      qb.andWhere('task.status = :status', { status });
    }

    qb.orderBy(`task.${sortBy}`, order).skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page: filters.page,
        limit: filters.limit,
        totalPages: Math.ceil(total / filters.limit!),
        hasNext: filters.page! < Math.ceil(total / filters.limit!),
        hasPrev: filters.page! > 1,
      },
    };
  }

  async findOne(userId: string, id: string) {
    const [task] = await this.taskRepo.find({
      where: {
        id,
        user: { id: userId },
      },
      take: 1,
      relations: ['subTasks', 'subTasks.user', 'user'],
      order: {
        subTasks: {
          createdAt: 'ASC',
        },
      },
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

  async updateTask(
    userId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    this.removeUndefinedFields(updateTaskDto);
    if (Object.keys(updateTaskDto).length === 0) {
      throw new BadRequestException('No update fields provided');
    }

    const task = await this.findOne(userId, taskId);

    if (updateTaskDto.subTasks) {
      this.removeUndefinedFields(updateTaskDto.subTasks);
      // creating map so that we have so we have key:value pair of id:tasks
      const subTaskUpdates = new Map(
        updateTaskDto.subTasks.map((t) => [t.id, t]),
      );

      const subTaskToUpdates = task.subTasks.reduce((accArr, subTask) => {
        const taskUpdates = subTaskUpdates.get(+subTask.id);

        console.log('where am i');
        if (taskUpdates) {
          Object.assign(subTask, taskUpdates);

          accArr.push(subTask);
        }
        return accArr;
      }, [] as Task[]);

      if (subTaskToUpdates.length > 0) {
        await this.taskRepo.save(subTaskToUpdates);
      } else {
        const newSubQueries = await this.addSubTasks(
          userId,
          task.id,
          updateTaskDto.subTasks as CreateSubtaskDto[],
        );

        task.subTasks = [...task.subTasks, ...newSubQueries];
        delete updateTaskDto.subTasks;
      }
    }
    if (Object.keys(updateTaskDto).length > 0) {
      Object.assign(task, updateTaskDto);
      await this.taskRepo.save(task);
    }

    return this.findOne(userId, taskId);
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

    console.log(taskWithUpdatedState);
    return this.taskRepo.save(taskWithUpdatedState);
  }

  async deleteTask(taskId: string) {
    return this.taskRepo.delete(taskId);
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
      (newStatus === TaskStatus.DONE || newStatus === TaskStatus.ABANDONED) &&
      task.subTasks.length > 0 &&
      this.validTransition(task.status, newStatus)
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
    } else if (
      (task.status === TaskStatus.ABANDONED ||
        newStatus === TaskStatus.ABANDONED) &&
      (newStatus === TaskStatus.OPEN || newStatus === TaskStatus.IN_PROGRESS) &&
      task.subTasks.length > 0 &&
      this.validTransition(task.status, newStatus)
    ) {
      task.subTasks.map((subtask) => {
        // if subTask state is not equal Done change

        subtask.status = newStatus;
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
    return tasks.map((subTask: CreateSubtaskDto): DeepPartial<Task> => {
      const taskEntity = this.taskRepo.create({
        ...subTask,
        user: { id: userId },
        parent: { id: parentTask.id },
      });
      // return {
      //   ...taskEntity,
      //   user: { id: userId },
      //   parent: parentTask,
      // };
      return taskEntity;
    });
  }

  private removeUndefinedFields(
    data: Record<string, any> | Record<string, any>[],
  ) {
    if (Array.isArray(data)) {
      data.forEach((el) => {
        for (const key in el) {
          if (!el[key]) delete el[key];
        }
      });
    } else {
      for (const key in data) {
        if (!data[key]) delete data[key];
      }
    }
  }
}
