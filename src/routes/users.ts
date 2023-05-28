import { UsersController } from "@http/controllers/UsersController";
import { ErrorHandler } from "./../http/middleware/ErrorHandler";
import express from "express";

const usersController = new UsersController();

const router = express.Router();

router.get("/", ErrorHandler.catchErrors(usersController.getUsers));

router.get("/:id", ErrorHandler.catchErrors(usersController.getUserInfo));

router.post(
  "/",
  ErrorHandler.catchErrors(usersController.create)
);

router.put(
  "/:id",
  ErrorHandler.catchErrors(usersController.update)
);

// Additional to the assessment spec, remember to delete tasks too in migartions.
router.delete(
  "/:id",
  ErrorHandler.catchErrors(usersController.delete)
);

export default router;
