import { TasksController } from "@http/controllers/TasksController";
import { ErrorHandler } from "./../http/middleware/ErrorHandler";
import express from "express";

const tasksController = new TasksController();

const router = express.Router();

// get user's tasks
router.get("/:user_id", ErrorHandler.catchErrors(tasksController.getUserTasks));

// get task detail
router.get("/:user_id/tasks/:task_id", ErrorHandler.catchErrors(tasksController.getTaskInfo));

// create task for a user
router.post(
  "/:user_id/tasks",
  ErrorHandler.catchErrors(tasksController.create)
);

// update user task
router.put(
  "/:user_id/tasks/:task_id",
  ErrorHandler.catchErrors(tasksController.update)
);

// delete user task
router.delete(
  "/:user_id/tasks/:task_id",
  ErrorHandler.catchErrors(tasksController.delete)
);

export default router;
