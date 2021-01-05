/** @format */

import { ApolloError } from "apollo-server-express";
import { MyContext } from "../Types/Context";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";

export const isAdmin: Middleware<MyContext> = async ({ context }, next) => {
  if (context.req.currentUser[0].Role === "Admin") {
    next();
  } else {
    throw new ApolloError("You are not allowed to access");
  }
};
