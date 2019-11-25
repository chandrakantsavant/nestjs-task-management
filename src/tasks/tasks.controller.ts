import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskModel, taskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() getTasksFilterDto: GetTasksFilterDto): TaskModel[] {
        if (Object.keys(getTasksFilterDto).length) {
            return this.tasksService.getTasksWithFilter(getTasksFilterDto);
        } else {
            return this.tasksService.getTasks();
        }

    }

    @Get('/:id')
    getTaskById(@Param('id') id): TaskModel {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): TaskModel {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id): TaskModel[] {
        return this.tasksService.deleteTaskById(id);
    }
    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status') status: taskStatus ): TaskModel[] {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
