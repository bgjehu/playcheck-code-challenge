import { Request, Response } from "express";
import { UserModel } from "../models";

export const storeUser = () => async (req: Request, res: Response, next) => {
  if (req.oidc.isAuthenticated()) {
    const { user } = req.oidc;
    await UserModel.findOneAndUpdate({ sub: user.sub }, user, { upsert: true });
  }
  next();
}
