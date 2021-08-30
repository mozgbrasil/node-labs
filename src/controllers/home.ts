import { Request, Response } from "express";

/**
 * Home page.
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
  req.flash("success", {
    msg: "Seja Bem Vindo a aplicação: " + process.env.APP_ID + "",
  });

  if (req.cookies.jsonwebtoken) {
    const token = req.cookies["jsonwebtoken"];
    req.flash("success", {
      msg: "Token: " + token,
    });
  }

  res.render("home", {
    title: "Home",
  });
};
