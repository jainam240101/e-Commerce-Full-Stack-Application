/** @format */

import { MyContext } from "../Types/Context";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { ApolloError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { User } from "../entity/Users";

export const isAuth: Middleware<MyContext> = async ({ context }, next) => {
  if (!context.req.headers.authorization) {
    throw new ApolloError("Give An Authentication Token");
  }
  const token = context.req.headers.authorization.split(" ")[1];
  const verify: any = jwt.verify(token, "kickass-project");
  if (!verify) {
    throw new ApolloError("Not Authorized");
  }
  const validUser: any = await User.find({
    where: {
      id: verify.id,
    },
  });
  if (!validUser) {
    throw new ApolloError("Not Authorized");
  }
  context.req.currentUser = validUser;
  return next();
};
