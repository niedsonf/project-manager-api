import { IProject } from 'src/domain/interfaces/project.interface';
import { ITask } from 'src/domain/interfaces/task.interface';
import type { IUser } from 'src/domain/interfaces/user.interface';
import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';
import { UserEntity } from './user.entity';

export class ProjectEntity implements IProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.projects)
  @JoinColumn()
  user: IUser;

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: ITask[];
}
