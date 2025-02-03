import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  status = 500;

  constructor() {
    super("db connection error");
  }

  generateErrors() {
    return [{ message: "db connection error" }];
  }
}
