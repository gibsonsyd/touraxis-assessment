import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";
import { Task } from "../../database/entities/Task";
import { IsUnique } from "../validators/IsUniqueValidator";

export class CreateTaskDTO {

    id?: number;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    @IsUnique(Task, "name")
    name: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    description: string;

    @IsNotEmpty()
    date_time: Date;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}