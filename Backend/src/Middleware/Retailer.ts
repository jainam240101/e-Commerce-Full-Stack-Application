/** @format */

import { ApolloError } from "apollo-server-express";
import { MyContext } from "../Types/Context";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import jwt from "jsonwebtoken";
import { Retailer } from "../entity/Reatilers";

export const isRetailer: Middleware<MyContext> = async ({ context }, next) => {
  if (!context.req.headers.authorization) {
    throw new ApolloError("Give An Authentication Token");
  }
  const token = context.req.headers.authorization.split(" ")[1];
  const verify: any = jwt.verify(token, "kickass-project");
  if (!verify) {
    throw new ApolloError("Not Authorized");
  }
  const validUser: any = await Retailer.findOne({
    where: {
      id: verify.id,
    },
  });
  if (!validUser) {
    throw new ApolloError("Not Authorized");
  }
  context.req.currentRetailer = validUser;
  return next();
};
