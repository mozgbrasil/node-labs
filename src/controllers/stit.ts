import { Request, Response, NextFunction } from "express";

/**
 * STIT Scope page.
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
  res.render("tests/stit/scope", { title: "Scope" });
};
