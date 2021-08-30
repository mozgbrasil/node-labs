import { validationResult } from "express-validator";
import { Handler } from "express";
import jwt from "jsonwebtoken";

export const ValidateParams: Handler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array().join(", "));
  }
  next();
};

export const ValidateToken: Handler = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];

  if (!token) {
    if (1 == 1) {
      return res.status(401).send("Missing authorization");
    } else {
      req.flash("errors", {
        msg: "No credentials sent!",
      });
      return res.redirect("/login");
    }
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as any;

    // req.user = payload
    res.locals.user = payload;
  } catch (error) {
    return res.status(400).send("Invalid authorization");
  }
  next();
};

export const dateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes();
  return "Today is " + date + " at " + time + ".";
};
