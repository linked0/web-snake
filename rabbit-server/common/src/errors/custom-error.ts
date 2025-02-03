export abstract class CustomError extends Error {
  abstract status: number;

  constructor(message: string) {
    super(message);
  }

  abstract generateErrors(): { message: string; field?: string }[];
}
