import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TableNames } from "../../constants/TableNames";
import { EntityBase } from "./EntityBase";
import { User } from "./User";

@Entity(TableNames.TASKS)
export class Task extends EntityBase {
  
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  execute_on: Date;

  @ManyToOne((type) => User, (user) => user.tasks, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({})
  userId: number;
  
  toResponse(): Partial<Task> {
    const task = new Task();
    task.id = this.id;
    task.name = this.name;
    task.description = this.description;
    task.execute_on = this.execute_on;
    task.created_on = this.created_on;
    task.updated_on = this.updated_on;
    task.user = this.user.toObject();

    return task;
  }
}
