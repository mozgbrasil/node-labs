/* eslint-disable @typescript-eslint/no-var-requires */
import swaggerUi from "swagger-ui-express";
const swaggerFile = require("../swagger_output.json");
import express from "express";
import { Handler } from "express";
import cors from "cors";
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
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

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
app.use(cors());
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

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

require("./endpoints")(app);

export default app;
