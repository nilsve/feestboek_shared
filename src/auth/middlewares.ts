import {Request, Response, NextFunction} from 'express';

import {validateJwt} from './jwt';
import { UserInfo, AccessRights, TokenType } from './interfaces';

/*
  This function will block requests if the user isn't logged on.
  Sets the `UserInfo` object on `res.locals.userInfo`.
*/
export async function requireLogin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const bearerToken = req.headers.authorization as string;
  try {
    const userInfo = await validateJwt (getJwtFromBearer(bearerToken), TokenType.AccessToken);
    res.locals.userInfo = userInfo;
    return next();
  } catch (err) {
    console.info('Error during validation of JWT');
  }

  return res.sendStatus(403);
};

export function getJwtFromBearer(bearerToken: string): string {
  const splitted = bearerToken.split('Bearer ');
  if (splitted.length > 1) {
    return splitted[1];
  } else {
    return '';
  }
}

/*
  This function will block requests if the user's AccessRights aren't `AccessRights.Admin`
*/
export async function requireAdmin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const userInfo = res.locals.userInfo as UserInfo;
  if (!userInfo) {
    throw new Error('No user information found during requireAdmin check! Make sure you have `requireLogin` above this route');
  }
  if (userInfo.rights === AccessRights.Admin) {
    return next();
  } else {
    return res.sendStatus(403);
  }
}
