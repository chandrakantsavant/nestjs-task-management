export class TaskModel {
    id: string;
    title: string;
    description: string;
    status: taskStatus;
}

export enum taskStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    OPEN = 'OPEN',
    Done = 'DONE',
}
