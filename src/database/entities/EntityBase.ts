import { hash } from "bcryptjs";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TableNames } from "../../constants/TableNames";

export class EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

}
