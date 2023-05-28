import { AppDataSource } from "./database/Data-Source";
import * as dotenv from "dotenv";
import "reflect-metadata";

import app from "@/app";

dotenv.config();

const PORT = process.env.APP_PORT || 3000;              // read port from environment variables

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connection success");
  })
  .catch((err) => console.error(err));                  // establish a database connection

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);     // start the webserver
});
