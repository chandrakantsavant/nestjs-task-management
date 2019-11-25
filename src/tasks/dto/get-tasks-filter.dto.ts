import { taskStatus } from '../tasks.model';

export class GetTasksFilterDto {
    status: taskStatus;
    search: string;
}
