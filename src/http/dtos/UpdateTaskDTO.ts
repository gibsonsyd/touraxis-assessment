import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";
import { Task } from "../../database/entities/Task";
import { IsUnique } from "../validators/IsUniqueValidator";

// called when updating a task, this is the incoming request object
export class UpdateTaskDTO {

    id?: number;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    @IsUnique(Task, "name")
    name: string;
}