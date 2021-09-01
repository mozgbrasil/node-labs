const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");

import express from "express";
import { Handler } from "express";
import compression from "compression"; // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import bluebird, { any } from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";
import * as contactController from "./controllers/contact";
import * as airbnbController from "./controllers/airbnb";
import * as stitController from "./controllers/stit";

// API keys and Passport configuration
import * as passportConfig from "./config/passport";

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { body, query, validationResult } from "express-validator";

//

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err) => {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    // process.exit();
  });

// Express configuration
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cookieParser());
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      mongoUrl,
      mongoOptions: {
        autoReconnect: true,
      },
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (
    !req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)
  ) {
    req.session.returnTo = req.path;
  } else if (req.user && req.path == "/account") {
    req.session.returnTo = req.path;
  }
  next();
});

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

//

app.use(function (req, res, next) {
  //
  const globalOptions: { [k: string]: any } = {};

  globalOptions.app_id = process.env.APP_ID;

  //
  if (req.cookies.jsonwebtoken) {
    const token = req.cookies["jsonwebtoken"];
    req.headers.authorization = `Bearer ${token}`;

    const secretKey = process.env.JWT_SECRET;

    jwt.verify(token, secretKey, function (err: any, decoded: any) {
      if (err) {
        return res.status(401).send("Failed to authenticate token.");
      } else {
        globalOptions.user = decoded;
      }
    });
  }

  //

  const _render = res.render;

  res.render = function (
    view: string,
    routeOptions: any,
    callback?: (err: Error, html: string) => void
  ) {
    // console.log("routeOptions: ", routeOptions);
    // console.log("globalOptions: ", globalOptions);

    const options = { ...routeOptions, ...globalOptions }; // merged obj

    // console.log("extendOptions: ", options);
    _render.call(this, view, options, callback);
  };
  next();
});

/**
 * Primary app routes.
 */
app.get("/", homeController.index);

const expr = process.env.APP_ID;
switch (expr) {
  case "st_id_cloud":
    app.get("/login", userController.getLoginStIt);
    app.post("/login", userController.postLoginStIt);
    break;
  default:
    app.get("/login", userController.getLogin);
    app.post("/login", userController.postLogin);
}

app.get("/logout", userController.logout);
app.get("/forgot", userController.getForgot);
app.post("/forgot", userController.postForgot);
app.get("/reset/:token", userController.getReset);
app.post("/reset/:token", userController.postReset);
app.get("/signup", userController.getSignup);
app.post("/signup", userController.postSignup);
app.get("/contact", contactController.getContact);
app.post("/contact", contactController.postContact);
app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
app.post(
  "/account/profile",
  passportConfig.isAuthenticated,
  userController.postUpdateProfile
);
app.post(
  "/account/password",
  passportConfig.isAuthenticated,
  userController.postUpdatePassword
);
app.post(
  "/account/delete",
  passportConfig.isAuthenticated,
  userController.postDeleteAccount
);
app.get(
  "/account/unlink/:provider",
  passportConfig.isAuthenticated,
  userController.getOauthUnlink
);

/**
 * API examples routes.
 */
app.get("/api", apiController.getApi);
app.get(
  "/api/facebook",
  passportConfig.isAuthenticated,
  passportConfig.isAuthorized,
  apiController.getFacebook
);

/**
 * OAuth authentication routes. (Sign in)
 */
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(req.session.returnTo || "/");
  }
);

/**
 * Projects routes.
 */
app.get(/.*fly$/, function (req, res) {
  res.send("/.*fly$/");
});
app.get("/airbnb", airbnbController.index);

// st_id_cloud

app.get("/stit_scope", stitController.index);

import { ValidateParams, ValidateToken } from "./util/validate";
import Products from "./controllers/Products";
import Organizations from "./controllers/Organizations";
import { Role } from "./types/Role";
import { HasPermission } from "./util/HasPermission";

app.get(
  "/products/:organizationName",
  query("tags").isString().optional(),
  ValidateParams,
  ValidateToken,
  (req, res) => {
    const tags = req.query.tags as string | undefined;
    const { organizationName } = req.params;
    const tagsParsed = tags?.split(",") || [];

    const organization = Organizations.find(organizationName);
    if (!organization) return res.status(404).send("Organization not found");
    if (
      !HasPermission(
        res.locals.user.roles as Role[],
        organization.level,
        organization.name
      )
    )
      return res.status(401).send("Access is not allowed");

    const products = Products.find(
      tagsParsed,
      Organizations.findOneAndChilds(organization.name).map((o) => o.name)
    );
    const total = products.length;

    res.send({ total, products });
  }
);

// findup_tec

// app.get("/", stitController.index);
app.put("/users/:userId", stitController.index);
app.delete("/users/:userId", stitController.index);
app.get("/users/:userId", stitController.index);
app.get("/users", stitController.index);

export default app;
