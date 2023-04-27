import { NextFunction, Request, Response } from 'express';
import Errors from './helper/errors';
  
class ErrorHandler {
  public static handle(
    error: Error & Errors,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export default ErrorHandler;