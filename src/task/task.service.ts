import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.taskRepository.save({
      // id generated automatically
      ...createTaskDto, // task text
      completed: false, // default task state
    });
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    // return await this.taskRepository.findOne(id);
    return await this.taskRepository.findOneOrFail(id);
  }

  async changeTaskText(id: number, createTaskDto: CreateTaskDto) {
    return await this.taskRepository.update(id, {
      ...createTaskDto,
    });
  }

  async changeTaskStatus(id: number) {
    const task = await this.taskRepository.findOne(id);
    task.completed = !task.completed;
    return await this.taskRepository.save(task);
  }

  async delete(id: number) {
    return await this.taskRepository.delete(id);
  }
}
