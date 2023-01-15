import { Request, Response, NextFunction } from "express";
import { HTTP400Error, HTTP403Error } from "../utils/httpErrors";
import config from "config";
import { ListingUtilities } from "../utils/ListingUtilities";

export const checkSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.q) {
    throw new HTTP400Error("Missing q parameter");
  } else {
    next();
  }
};

export const checkAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  const token: any = req.get(config.get("AUTHORIZATION"));
  if (!token) {
    throw new HTTP400Error({ responseCode: 400, responseMessage: "Token required" });
  }

  return ListingUtilities.verifyToken(token)
    .then((result: any) => {
      next();
    })
    .catch((error: any) => {
      //console.log("error",error.message);
      throw new HTTP403Error({ responseCode: 403, responseMessage: error.message });
    });
};
