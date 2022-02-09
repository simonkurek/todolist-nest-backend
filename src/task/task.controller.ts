import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskIdParam } from './dto/task-id.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

@Controller('/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // command query segregation - command not return anything, query not modificate anything

  @Post('/create')
  create(@Body() createTaskDto: CreateTaskDto): void {
    this.taskService.create(createTaskDto);
  }

  @Get('/all')
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param() param: TaskIdParam): Promise<Task> {
    try {
      return await this.taskService.findOne(param.id);
    } catch {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch('/changeTaskText/:id')
  changeTaskText(
    @Param() param: TaskIdParam,
    @Body() createTaskDto: CreateTaskDto,
  ): void {
    this.taskService.changeTaskText(param.id, createTaskDto);
  }

  @Patch('/changeTaskStatus/:id')
  markAsCompleted(@Param() param: TaskIdParam): void {
    this.taskService.changeTaskStatus(param.id);
  }

  @Delete('/delete/:id')
  delete(@Param() param: TaskIdParam): void {
    this.taskService.delete(param.id);
  }
}
