import express from "express";
import tokenRouter from "./routes/tokenRoutes";

export class App {
  public expressApp = express();

  constructor() {
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.expressApp.use(express.json());
  }

  private routes() {
    // token 관련 라우트 등록
    this.expressApp.use("/", tokenRouter);
  }
}
