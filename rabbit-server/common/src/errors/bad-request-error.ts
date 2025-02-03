import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  status = 400;

  constructor(public message: string) {
    super(message);
  }

  generateErrors() {
    return [{ message: this.message }];
  }
}
