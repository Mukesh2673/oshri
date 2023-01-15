import { Request, Response, NextFunction } from "express";
import { HTTP400Error, HTTP403Error } from "../../../../utils/httpErrors";
import Joi, { any } from "joi";
import config from "config";
import { ListingUtilities } from "../../../../utils/ListingUtilities";
import { errorMessageHander } from "../../../../utils/ErrorHandler";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().trim(true).required().messages({
      "string.empty": "Name can not be empty",
    })
  });
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    let messageArr = errorMessageHander(error.details);
    throw new HTTP400Error(
      ListingUtilities.sendResponsData({
        code: 400,
        message: messageArr[0],
      })
    );
  } else {
    req.body = value;
    next();
  }
};