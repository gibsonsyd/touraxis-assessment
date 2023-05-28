import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { User } from "../../database/entities/User";
import { IsUnique } from "../validators/IsUniqueValidator";

// called when updating a user, this is the incoming request object
export class UpdateUserDTO {

    id?: number;
    
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    first_name: string;
  
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    last_name: string;

}