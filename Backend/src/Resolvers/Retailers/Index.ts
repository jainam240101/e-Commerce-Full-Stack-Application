/** @format */

import { Retailer } from "../../entity/Reatilers";
import { isRetailer } from "../../Middleware/Retailer";
import { MyContext } from "../../Types/Context";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  createRetailerInput,
  LoginReatailerInput,
  updateRetailerInput,
} from "./Inputs";
import {
  createRetailerUtil,
  deleteRetailerUtil,
  loginRetailerUtil,
  updateRetailerUtil,
} from "./Utils/Utils";

@Resolver()
export class Retailers {
  @Mutation(() => Retailer)
  async createRetailer(
    @Arg("data")
    { Name, CustomerCareNumber, Password, Email, Address }: createRetailerInput
  ) {
    return createRetailerUtil({
      Address,
      Email,
      Password,
      CustomerCareNumber,
      Name,
    });
  }

  @Mutation(() => Retailer)
  async loginRetailer(@Arg("data") { Email, Password }: LoginReatailerInput) {
    return loginRetailerUtil({ Email, Password });
  }

  @UseMiddleware(isRetailer)
  @Query(() => Retailer)
  async loggedInReatailer(@Ctx() ctx: MyContext) {
    return ctx.req.currentRetailer;
  }

  @UseMiddleware(isRetailer)
  @Mutation(() => Retailer)
  async updateRetailer(
    @Ctx() ctx: MyContext,
    @Arg("data")
    { Name, Password, Email, CustomerCareNumber, Address }: updateRetailerInput
  ) {
    return updateRetailerUtil({
      Name,
      Password,
      Email,
      CustomerCareNumber,
      Address,
      Retailer: ctx.req.currentRetailer,
    });
  }

  @UseMiddleware(isRetailer)
  @Mutation(() => Retailer)
  async deleteRetailer(@Ctx() ctx: MyContext) {
    return deleteRetailerUtil(ctx.req.currentRetailer.id);
  }
}
