import { TasksController } from "@http/controllers/TasksController";
import { ErrorHandler } from "./../http/middleware/ErrorHandler";
import express from "express";

const tasksController = new TasksController();

const router = express.Router({mergeParams: true});

// get user's tasks
router.get("/", ErrorHandler.catchErrors(tasksController.getUserTasks));

// get task detail
router.get("/:task_id", ErrorHandler.catchErrors(tasksController.getTaskInfo));

// create task for a user
router.post(
  "/tasks",
  ErrorHandler.catchErrors(tasksController.create)
);

// update user task
router.put(
  "/tasks/:task_id",
  ErrorHandler.catchErrors(tasksController.update)
);

// delete user task
router.delete(
  "/tasks/:task_id",
  ErrorHandler.catchErrors(tasksController.delete)
);

export default router;
