import { AppDataSource } from "./../../database/Data-Source";
import { User } from "./../../database/entities/User";
import { Paginator } from "@/database/Paginator";
import { ResponseUtil } from "@/utils/Response";
import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { CreateUserDTO } from "./../dtos/CreateUserDTO";
import { UpdateUserDTO } from "./../dtos/UpdateUserDTO";

// Controller for /api/Users endpoints
export class UsersController {

    // Return a list of users
    async getUsers(req: Request, res: Response) {
        
        const builder = await AppDataSource.getRepository(User).createQueryBuilder().orderBy("id", "DESC");
        const { records: users, paginationInfo } = await Paginator.paginate(builder, req);
        
        const authorsData = users.map((user: User) => {
            return user.toResponse();
        });

        return ResponseUtil.sendResponse(res, "Fetched users successfully", authorsData, paginationInfo);
    }

    // Return details for a specific user found byy their database Id
    async getUserInfo(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const user = await AppDataSource.getRepository(User).findOneByOrFail({
        id: Number(id),
        });

        return ResponseUtil.sendResponse<User>(res, "Fetch user successfully", user.toObject());
    }

    // Adds a new user to the database
    async create(req: Request, res: Response): Promise<Response> {

        const userData = req.body;

        const dto = new CreateUserDTO();
        Object.assign(dto, userData);

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(User);
        const author = repo.create(userData);
        await repo.save(author);

        return ResponseUtil.sendResponse(res, "Successfully created new user", author, 200);
    }

    // updates a user based on their database Id
    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const userData = req.body;

        const dto = new UpdateUserDTO();
        Object.assign(dto, userData);
        dto.id = parseInt(id);

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(User);

        const user = await repo.findOneByOrFail({
        id: Number(id),
        });

        repo.merge(user, userData);
        await repo.save(user);
        return ResponseUtil.sendResponse(res, "Successfully updated the user", user.toObject());
    }

    // Deletes a user by database Id
    // TODO: Complete as additional if there is time.
    async delete(req: Request, res: Response): Promise<Response> {

        const { id } = req.params;
        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOneByOrFail({
        id: Number(id),
        });

        await repo.remove(user);
        return ResponseUtil.sendResponse(res, "Successfully deleted the user", null);
    }
}
