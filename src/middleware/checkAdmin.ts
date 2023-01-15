import { Request, Response, NextFunction } from 'express';
import config from 'config';
import { HTTP400Error, HTTP403Error } from '../utils/httpErrors';
import { ListingUtilities } from '../utils/ListingUtilities';

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const decoded: any = await ListingUtilities.getDecoded(
    req.get(`${config.get('AUTHORIZATION')}`)
  );

  if (decoded.designation !== 'Admin') {
    throw new HTTP403Error(config.get('ERROR.AUTH_RELATED.NO_PRIVILEGE'));
  }

  next();
};
