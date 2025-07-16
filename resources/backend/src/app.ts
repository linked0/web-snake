import express from "express";
import tokenRouter from "./routes/tokenRoutes";
import { coursesRouter } from "./routes/courseRoutes";
import cors from "cors";

export class App {
  public expressApp = express();

  constructor() {
    // Use the cors middleware before setting up routes
    this.expressApp.use(
      cors({
        origin: "http://localhost:5173", // or whatever your front-end origin is
      })
    );

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.expressApp.use(express.json());
  }

  private routes() {
    // token 관련 라우트 등록
    this.expressApp.use("/", tokenRouter);

    // New courses route
    this.expressApp.use("/", coursesRouter);
  }
}
