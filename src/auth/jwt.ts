import * as jwt from 'jsonwebtoken';
import { UserToken, UserInfo, TokenType } from './interfaces';
import configuration from '../configuration/configuration';

/*
  Validates the given JWT token. Returns a `UserToken` object if it is valid.
*/
export async function validateJwt(jwtToken: string, expectedTokenType: TokenType = TokenType.AccessToken): Promise<UserToken> {
  return new Promise((resolve, reject) => {
    const {jwtSecret} = configuration.getConfiguration();
    jwt.verify(jwtToken, jwtSecret, (err: jwt.VerifyErrors, decoded) => {
      if (err) {
        return reject(err.name);
      } else {
        const userToken = decoded as UserToken;
        if (userToken.type === expectedTokenType) {
          return resolve(userToken);
        } else {
          return reject(`Invalid token type! Expected ${expectedTokenType} but got ${userToken.type}`);
        }
      }
    });
  })
}

/*
  Returns JWT version of UserToken
*/
export async function generateJwt(userInfo: UserInfo, tokenType: TokenType): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const {jwtSecret, refreshTokenValidDuration, accessTokenValidDuration} = configuration.getConfiguration();

    const tokenValidDuration = tokenType === TokenType.AccessToken ? accessTokenValidDuration : refreshTokenValidDuration;

    const userToken: UserToken = {
      type: tokenType,
      userInfo,
      exp: Math.floor(Date.now() / 1000) + tokenValidDuration,
    }
    jwt.sign(userToken, jwtSecret, (err, token) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(token);
      }
    });
  });
}