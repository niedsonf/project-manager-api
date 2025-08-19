import { ITask } from '../interfaces/task.interface';
import { Project } from './project';
import { User } from './user';

export class Task implements ITask {
  id: number;
  name: string;
  status: 'pending' | 'completed';
  project: Project;
  user: User;
}
