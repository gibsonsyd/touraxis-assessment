import express, { Express, Request, Response } from "express";
import { ErrorHandler } from "./http/middleware/ErrorHandler";

import bodyParser from "body-parser";
import cors from "cors";
import usersRoute from "./routes/Users";
import tasksRoute from "./routes/Tasks";
import { CronManager } from './cron/CronManager';

const fs = require("fs");

const app: Express = express();


app.use(cors());                                      // allow calling this API from multiple sources / domains
app.use(bodyParser.json());                           // parse incoming requests as JSON
app.use(bodyParser.urlencoded({ extended: true }));   // urlencode request body

usersRoute.use('/:user_id/tasks', tasksRoute);        // route tasks via the /api/users route
app.use("/api/users", usersRoute);                    // when hitting /api/users use the user route object


app.get('/', function(req: Request, res: Response) {  // showing a message when hitting the default route
  return res.send(`
      You've reached the touraxis assessment home page. 
      Please follow the README.md for further instructions`);
});

app.use("*", (req: Request, res: Response) => {       // when requesting an invalid route notify the caller
  return res.status(404).json({
    success: false,
    message: "Invalid route",
  });
});

app.use(ErrorHandler.handleErrors);                   // error handling middleware

const cronManager = new CronManager();                // initialize our CRON process manager
cronManager.scheduleTaskCheck();                      // init and run the recurring cron check for pending and expired tasks.

export default app;
