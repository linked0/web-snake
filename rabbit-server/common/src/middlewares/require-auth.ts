import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Bypass processing for public article show routes
  console.log(req.path);
  if (req.path.startsWith("/show")) {
    return next();
  }

  if (!req.currentUser) {
    return next(new NotAuthorizedError());
  }
  next();
};
