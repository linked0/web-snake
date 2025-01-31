import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../model/user";
import { authenticationService, BadRequestError } from "../../../common";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new BadRequestError("Wrong credentials"));

    const isEqual = await authenticationService.pwdCompare(
      user.password,
      password
    );
    if (!isEqual) return next(new BadRequestError("Wrong credentials"));

    const token = jwt.sign({ userId: user.id, email }, process.env.JWT_KEY!, {
      expiresIn: "10h",
    });
    req.session = { jwt: token };

    res.status(200).send(user);
  }
);

export { router as SigninRouter };
