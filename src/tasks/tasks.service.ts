import { Injectable, NotFoundException } from '@nestjs/common';
import { taskStatus, TaskModel } from './tasks.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks = [];

    getTasks(): TaskModel[] {
        return this.tasks;
    }

    getTasksWithFilter(getTasksFilterDto: GetTasksFilterDto): TaskModel[] {
        const {status, search} = getTasksFilterDto;
        let tasks: TaskModel[] = this.tasks;
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if (search) {
            tasks = tasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search));
        }

        return tasks;

    }

    getTaskById(id: string): TaskModel {
        const found = this.tasks.find(task => task.id === id);
        if (!found) {
            throw new NotFoundException(`Task with specified id "${id}" not found`);
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDto): TaskModel {
        const { title, description } = createTaskDto;
        const task: TaskModel  = {
            id: uuid(),
            title,
            description,
            status: taskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    deleteTaskById(id: string): TaskModel[] {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
        return this.tasks;

    }

    updateTaskStatus(id: string, status: taskStatus): TaskModel[] {
        const task = this.getTaskById(id);
        task.status = status;
        return this.tasks;
    }
}
