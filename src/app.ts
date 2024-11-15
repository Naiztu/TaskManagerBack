import express, { json, Request } from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import taskRouter from "./routes/task.routes";
import { authentification } from "./middleware/auth.middleware";

export const app = express();

app.use(cors<Request>());
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello, the server is running!");
});

app.use("/auth", authRouter);
app.use("/tasks", authentification, taskRouter);
