import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// Demonstrates inheritance in typescript
export class EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

}
