import { AppDataSource } from "./../../database/Data-Source";
import { Paginator } from "@/database/Paginator";
import { ResponseUtil } from "@/utils/Response";
import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { CreateTaskDTO } from "./../dtos/CreateTaskDTO";
import { UpdateTaskDTO } from "./../dtos/UpdateTaskDTO";
import { Task } from "@/database/entities/Task";
import { TaskStatuses } from "@/constants/TaskStatuses";

// Controller for /api/Users/x/tasks endpoints
export class TasksController {

    // return a list of tasks for a specific user
    async getUserTasks(req: Request, res: Response) {
        
        const { user_id } = req.params;

        const builder = await AppDataSource.getRepository(Task)
          .createQueryBuilder("task")
          .leftJoinAndSelect("task.user", "user")
          .orderBy("task.id", "DESC")
          .where('task.userId = :user_id', { user_id: Number(user_id) });

        const { records: tasks, paginationInfo } = await Paginator.paginate(builder, req);
        
        const taskData = tasks.map((task: Task) => {
          return task.toResponse();
        });
    
        return ResponseUtil.sendResponse(res, "Fetched tasks successfully", taskData, paginationInfo);
    }

    // Return details for a specific task filtered by user and task id
    async getTaskInfo(req: Request, res: Response): Promise<Response> {
        const { user_id, task_id } = req.params;
        const task = await AppDataSource.getRepository(Task).findOneByOrFail({
        id: Number(task_id),
        userId: Number(user_id)
        });

        return ResponseUtil.sendResponse<Task>(res, "Fetch task successfully", task.toObject());
    }

    // Adds a new task to the database
    async create(req: Request, res: Response): Promise<Response> {

        const { user_id } = req.params;
        const taskData = req.body;
        const dto = new CreateTaskDTO();
        Object.assign(dto, taskData);

        dto.userId = Number(user_id);
        
        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(Task);
        const task = repo.create(dto);
        //We're not parsing date_time > execute_on with Object.assign
        task.execute_on = dto.date_time;
        task.status = TaskStatuses.PENDING; // set via default value, being explicit here.

        await repo.save(task);

        return ResponseUtil.sendResponse(res, "Successfully created new task", task, 200);
    }

    // updates a user based on their database Id
    async update(req: Request, res: Response): Promise<Response> {

        const { user_id, task_id } = req.params;
        const taskData = req.body;

        const dto = new UpdateTaskDTO();
        Object.assign(dto, taskData);
        dto.id = parseInt(task_id);

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(Task);

        const task = await repo.findOneByOrFail({
            id: Number(task_id),
            userId: Number(user_id),
            status: TaskStatuses.PENDING
        }); // fail update if task status is anything but pending.

        repo.merge(task, taskData);

        await repo.save(task);
        return ResponseUtil.sendResponse(res, "Successfully updated the user's task", task.toObject());
    }

    // Deletes a task
    async delete(req: Request, res: Response): Promise<Response> {

        const { user_id, task_id } = req.params;

        const repo = AppDataSource.getRepository(Task);
        const task = await repo.findOneByOrFail({
            id: Number(task_id),
            userId: Number(user_id)
        });

        await repo.remove(task);
        return ResponseUtil.sendResponse(res, "Successfully deleted the user's task", null);
    }
}
