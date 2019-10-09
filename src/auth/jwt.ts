import * as jwt from 'jsonwebtoken';
import { UserData, UserInfo } from './interfaces';
import configuration from '../configuration/configuration';

/*
  Validates the given JWT token. Returns a `UserInfo` object if it is valid.
*/
export async function validateJwt(jwtToken: string): Promise<UserInfo> {
  return new Promise((resolve, reject) => {
    const {jwtSecret} = configuration.getConfiguration();
    jwt.verify(jwtToken, jwtSecret, (err: jwt.VerifyErrors, decoded) => {
      if (err) {
        return reject(err);
      } else {
        return resolve((decoded as UserData).userInfo);
      }
    });
  })
}

/*
  Returns JWT version of UserData
*/
export async function generateJwt(userInfo: UserInfo): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const {jwtSecret, jwtDuration} = configuration.getConfiguration();
    const userData: UserData = {
      userInfo,
      exp: Math.floor(Date.now() / 1000) + jwtDuration,
    }
    jwt.sign(userData, jwtSecret, (err, token) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(token);
      }
    });
  });
}