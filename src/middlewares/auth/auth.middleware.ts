import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { isTokenBlacklisted } from './../../utils/token.util';
import { CandidateEntity } from './../../database/entities/entity/candidate.entity';
import { EmployeeEntity } from './../../database/entities/entity/employee.entity';
import { RecruiterEntity } from './../../database/entities/entity/recruiter.entity';
import { statusCode } from './../../utils/status.util';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.access_token || req.headers.authorization;

  if (!token) {
    res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
    return; 
  }

  if(isTokenBlacklisted(token)) {
    res.clearCookie('access_token');
    res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const verifyToken = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    if (!verifyToken) {
      res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' });
      return; 
    }

    req.user = verifyToken as RecruiterEntity | EmployeeEntity | CandidateEntity;
    next(); 
  } catch (error) {
    res.clearCookie('access_token');
    res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};
