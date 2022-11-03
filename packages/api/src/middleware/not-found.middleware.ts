import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const message = "Not Found";
  response.status(404).json({ message });
};
