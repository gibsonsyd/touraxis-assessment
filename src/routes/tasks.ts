import { TasksController } from "@http/controllers/TasksController";
import { ErrorHandler } from "./../http/middleware/ErrorHandler";
import express from "express";

const tasksController = new TasksController();

// determine routing for calls to /api/user/x/tasks/...
const router = express.Router({mergeParams: true});     // allow retrieval of query params in parent route (/api/users) 

// [/api/users/1/tasks]
router.get("/", ErrorHandler.catchErrors(tasksController.getUserTasks));

// [/api/users/1/tasks/1]
router.get("/:task_id", ErrorHandler.catchErrors(tasksController.getTaskInfo));

// [/api/users/1/tasks]
router.post(
  "/",
  ErrorHandler.catchErrors(tasksController.create)
);

// [/api/users/1/tasks/1]
router.put(
  "/:task_id",
  ErrorHandler.catchErrors(tasksController.update)
);

// [/api/users/1/tasks/1]
router.delete(
  "/:task_id",
  ErrorHandler.catchErrors(tasksController.delete)
);

export default router;
