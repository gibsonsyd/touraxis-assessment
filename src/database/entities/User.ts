import { hash } from "bcryptjs";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TableNames } from "../../constants/TableNames";
import { EntityBase } from "./EntityBase";
import { Task } from "./Task";

@Entity(TableNames.USERS)
export class User extends EntityBase {
  
  @Column()
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @OneToMany((type) => Task, (task) => task.user)
  tasks: Task[];

  toResponse(): Partial<User> {
    const responseUser = new User();
    responseUser.id = this.id;
    responseUser.username = this.username;
    responseUser.first_name = this.first_name;
    responseUser.last_name = this.last_name;
    responseUser.created_on = this.created_on;
    responseUser.updated_on = this.updated_on;

    return responseUser;
  }

  toObject(): User {
    return {
      id: this.id,
      username: this.username,
      first_name: this.first_name,
      last_name: this.last_name,
      created_on: this.created_on,
      updated_on: this.updated_on,
    } as User;
  }
}
