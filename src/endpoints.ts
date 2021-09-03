import passport from "passport";
import { body, query, validationResult } from "express-validator";
// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";
import * as contactController from "./controllers/contact";
import * as airbnbController from "./controllers/airbnb";
// tests
import * as stitController from "./controllers/stit";
import * as PatientsController from "./controllers/PatientsController";
// API keys and Passport configuration
import * as passportConfig from "./config/passport";
// st_id_cloud
import { ValidateParams, ValidateToken } from "./util/validate";
import Products from "./controllers/Products";
import Organizations from "./controllers/Organizations";
import { Role } from "./types/Role";
import { HasPermission } from "./util/HasPermission";

module.exports = function (app: any) {
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
  app.get(
    "/account",
    passportConfig.isAuthenticated,
    userController.getAccount
  );
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
    (req: any, res: any) => {
      res.redirect(req.session.returnTo || "/");
    }
  );

  /**
   * Projects routes.
   */
  app.get(/.*fly$/, function (req: any, res: any) {
    res.send("/.*fly$/");
  });
  app.get("/airbnb", airbnbController.index);

  // st_id_cloud

  app.get("/stit_scope", stitController.index);

  app.get(
    "/products/:organizationName",
    query("tags").isString().optional(),
    ValidateParams,
    ValidateToken,
    (req: any, res: any) => {
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
  app.get(
    "/users",
    function (req: any, res: any, next: any) {
      // #swagger.tags = ['User']
      // #swagger.description = 'Endpoint para obter todos registros.'
      /* #swagger.parameters['page'] = {
        in: 'query',
        description: 'Current page showing',
        example: '3',
        type: 'int',
        required: true,
      }
      #swagger.parameters['pageSize'] = {
        in: 'query',
        description: 'Total items showing in per page',
        example: '50',
        type: 'int',
        required: true,
      } */
      next();
    },
    PatientsController.select_records
  );
  app.get(
    "/users/:_id",
    function (req: any, res: any, next: any) {
      // #swagger.tags = ['User']
      // #swagger.description = 'Endpoint para obter o registro.'
      next();
    },
    PatientsController.select_record,
    function (req: any, res: any, next: any) {
      /* #swagger.responses[200] = {
        schema: { $ref: "#/definitions/User" },
        description: 'Usuário encontrado.'
      } */
      next();
    }
  );
  app.post(
    "/users",
    function (req: any, res: any, next: any) {
      // #swagger.tags = ['User']
      // #swagger.description = 'Endpoint para criar registro.'
      /* #swagger.parameters['newBody'] = {
        in: 'body',
        description: 'Informações do usuário.',
        required: true,
        type: 'object',
        schema: { $ref: "#/definitions/FindupUsers" }
      } */
      next();
    },
    PatientsController.create_record
  );
  app.put(
    "/users/:_id",
    function (req: any, res: any, next: any) {
      // #swagger.tags = ['User']
      // #swagger.description = 'Endpoint para atualizar registro.'
      /* #swagger.parameters['newBody'] = {
        in: 'body',
        description: 'Informações do usuário.',
        required: true,
        type: 'object',
        schema: { $ref: "#/definitions/FindupUsers" }
      } */
      next();
    },
    PatientsController.update_record
  );
  app.delete(
    "/users/:_id",
    function (req: any, res: any, next: any) {
      // #swagger.tags = ['User']
      // #swagger.description = 'Endpoint para excluir o registro.'
      next();
    },
    PatientsController.delete_record
  );

};
