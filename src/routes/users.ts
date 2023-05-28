import { UsersController } from "@http/controllers/UsersController";
import { ErrorHandler } from "./../http/middleware/ErrorHandler";
import express from "express";

const usersController = new UsersController();

// determine routing for calls to /api/user
const router = express.Router();

// [/api/users]
router.get("/", ErrorHandler.catchErrors(usersController.getUsers));

// [/api/users/1]
router.get("/:id", ErrorHandler.catchErrors(usersController.getUserInfo));

// [/api/users]
router.post(
  "/",
  ErrorHandler.catchErrors(usersController.create)
);

// [/api/users/1]
router.put(
  "/:id",
  ErrorHandler.catchErrors(usersController.update)
);

// [/api/users/1]
router.delete(
  "/:id",
  ErrorHandler.catchErrors(usersController.delete)
);

export default router;
