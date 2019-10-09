import {Request, Response, NextFunction} from 'express';

const cors = {
  origin: '*',
};

/*
  Sets up CORS headers for requests
*/  
export function initializeCors(req: Request, res: Response, next: NextFunction): Response | void {
  res.header("Access-Control-Allow-Origin", cors.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  return next();
}
