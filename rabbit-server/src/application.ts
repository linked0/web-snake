import express, { Request, Response, Router, NextFunction } from "express";
import { graphqlHTTP } from "express-graphql";
import { createServer, Server } from "http";
import ws from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import {
  Connection,
  EntityManager,
  EntityRepository,
  IDatabaseDriver,
  MikroORM,
  RequestContext,
} from "@mikro-orm/core";
import {
  AdminRoute,
  SignupRouter,
  SigninRouter,
  NewArticleRoute,
  ShowArticleRouter,
  NewCommentRoute,
  DeleteCommentRoute,
  ActorController,
  CurrentUserRouter,
  SignoutRouter,
} from "./routers";

import mongoose, { plugin } from "mongoose";
import cors from "cors";
import ormConfig from "./orm.config";
import Actor from "./entities/actor.entity";
import { resolvers } from "graphql-scalars";
import { formatError, validate } from "graphql";
import ActorResolver from "./resolvers/actor.resolver";
import { buildSchema } from "type-graphql";
import expressPlayground from "graphql-playground-middleware-express";
import ReqContext from "./interfaces/ReqContext";

import {
  currentUser,
  NotFoundError,
  requireAuth,
  errorHandler,
} from "../common";

import cookieSession = require("cookie-session");

//For env File
dotenv.config();

// export const DI = {} as {
//   orm: MikroORM;
//   em: EntityManager;
//   userRepository: EntityRepository<Actor>;
// };

// Define the DI structure with type alias for better reusability
type DIContainer = {
  orm: MikroORM;
  em: EntityManager;
  actorRepository: EntityRepository<Actor>;
};

// Create an empty DI object with proper typing
export const DI: DIContainer = {
  orm: {} as MikroORM,
  em: {} as EntityManager,
  actorRepository: {} as EntityRepository<Actor>,
};

export default class Application {
  public expressApp!: express.Application;
  public orm!: MikroORM<IDatabaseDriver<Connection>>;
  public apolloServer!: ApolloServer;

  public connect = async (): Promise<void> => {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY is not defined");
    }

    try {
      mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
      console.log("Error while connecting to MongoDB  :", error);
      throw new Error("Error while connecting to MongoDB");
    }

    // Initialize MikorORM
    try {
      this.orm = await MikroORM.init(ormConfig);
      DI.orm = this.orm;
      DI.em = DI.orm.em;
      DI.actorRepository = DI.em.getRepository(Actor);

      // const migrator = this.orm.getMigrator();
      // const migrations = await migrator.getPendingMigrations();
      // if (migrations && migrations.length > 0) {
      //   await migrator.up();
      // }
    } catch (error) {
      console.error("📌 Could not connect to the database", error);
      throw Error(String(error));
    }
  };

  public async init() {
    const port = process.env.PORT || 8000;

    this.expressApp = express();

    this.expressApp.use(
      cors({
        origin: "*",
        optionsSuccessStatus: 200,
      })
    );

    // for signin, signup
    this.expressApp.set("trust proxy", true);

    this.expressApp.use(bodyParser.urlencoded({ extended: true }));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(
      cookieSession({
        signed: false,
        secure: false,
      })
    );

    this.expressApp.use(currentUser);

    this.expressApp.get("/", (_req, res) => res.send("Hello, World!"));

    // Routes for signup and signin
    this.expressApp.use(SignupRouter);
    this.expressApp.use(SigninRouter);
    this.expressApp.use(CurrentUserRouter);
    this.expressApp.use(SignoutRouter);

    // Routes for article and comment
    this.expressApp.use("/admin", AdminRoute);
    this.expressApp.use("/api/article", requireAuth, NewArticleRoute);
    this.expressApp.use(ShowArticleRouter);
    this.expressApp.use(requireAuth, NewCommentRoute);
    this.expressApp.use(requireAuth, DeleteCommentRoute);

    // Routes for actor
    this.expressApp.use("/actor", ActorController);

    if (process.env.NODE_ENV !== "production") {
      console.log("🚀 Starting server in development mode");
      // Serve GraphQL Playground on a different route like /playground
      this.expressApp.get(
        "/playground",
        expressPlayground({ endpoint: "/graphql" })
      );
    }

    // GraphQL schema and execution setup
    try {
      const schema = await buildSchema({
        resolvers: [ActorResolver],
      });

      // Serve GraphQL queries and mutations via POST /graphql
      this.expressApp.post(
        "/graphql",
        bodyParser.json(),
        graphqlHTTP((req, res) => ({
          schema,
          context: { req, res, em: this.orm.em.fork() } as ReqContext,
          customFormatErrorFn: (error) => {
            return {
              message: error.message || "Internal Server Error",
              locations: error.locations,
              path: error.path,
            };
          },
        }))
      );
    } catch (error) {
      console.error("📌 Could not connect to the database", error);
      throw Error(String(error));
    }

    this.expressApp.all("*", (_req, res, next) => {
      next(new NotFoundError());
    });

    this.expressApp.use(errorHandler);

    this.expressApp.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
}
