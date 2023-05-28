import express, { Express, Request, Response } from "express";
import { ErrorHandler } from "./http/middleware/ErrorHandler";

import bodyParser from "body-parser";
import cors from "cors";
import usersRoute from "./routes/users";
import tasksRoute from "./routes/tasks";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

usersRoute.use('/:user_id/tasks', tasksRoute);
app.use("/api/users", usersRoute);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid route",
  });
});

app.use(ErrorHandler.handleErrors);

export default app;
