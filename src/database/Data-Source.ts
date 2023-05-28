import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Task } from "./entities/Task";
import { User } from "./entities/User";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "touraxis",
  password: process.env.DB_PASSWORD || "touraxis",
  database: process.env.DB_DATABASE || "touraxis",
  logging: ["query"],
  synchronize: false,
  entities: [User, Task],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});
