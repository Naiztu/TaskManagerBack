import express, { json, Request } from "express";
import cors from "cors";

export const app = express();

app.use(cors<Request>());
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello, the server is running!");
});
