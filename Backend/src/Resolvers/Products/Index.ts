/** @format */

import { Product } from "../../entity/Products";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  changeBasicInfomation,
  changeFeatureInfomation,
  changePaymentOffer,
  changeExchangeOffer,
  changeImage,
  insertProductDetails,
  deleteFeature,
  createAdvanceInformation,
} from "./Inputs";
import {
  addProductMutation,
  changeBasicInformationUtil,
  createAdvanceInformationUtil,
  changeAdvanceInfomationUtil,
  deleteProductUtil,
  deleteAdvanceInfomationUtil,
} from "./Utils";
import { ApolloError } from "apollo-server-express";
import { isAuth } from "../../Middleware/Authentication";
import { isRetailer } from "../../Middleware/Retailer";
import { MyContext } from "src/Types/Context";

@Resolver()
export class ProductResolver {
  // Queries
  @Query(() => Product)
  async productData(@Arg("id") id: string): Promise<Product | undefined> {
    try {
      const product: Product | undefined = await Product.findOne({
        where: {
          id: id,
        },
      });
      if (product === undefined) {
        throw new ApolloError(`Product not found`);
      }
      return product;
    } catch (error) {
      throw new ApolloError(`${error}`);
    }
  }

  // Mutations
  @UseMiddleware(isAuth, isRetailer)
  @Mutation(() => Product)
  async addProduct(
    @Arg("data")
    {
      Description,
      Name,
      ExchangeOffers,
      Features,
      Quantity,
      Images,
      PaymentOffers,
      Price,
      Category,
    }: insertProductDetails,
    @Ctx() ctx: MyContext
  ): Promise<Product | undefined> {
    return addProductMutation({
      Name,
      Description,
      Category,
      Quantity,
      ExchangeOffers,
      Features,
      Images,
      PaymentOffers,
      Price,
      SoldBy: ctx.req.currentUser[0],
    });
  }

  @Mutation(() => Product)
  async changeBasicInformation(
    @Arg("data")
    { id, Category, Description, Name, Quantity, Price }: changeBasicInfomation
  ): Promise<Product | undefined> {
    return changeBasicInformationUtil({
      id,
      Category,
      Quantity,
      Description,
      Price,
      Name,
    });
  }

  @Mutation(() => String)
  async deleteProduct(@Arg("id") id: string) {
    await deleteProductUtil(id);
    return "Success";
  }

  @Mutation(() => Product)
  async createFeatures(
    @Arg("data") { id, information }: createAdvanceInformation
  ) {
    createAdvanceInformationUtil({
      id,
      information,
      type: "Features",
    });
  }

  @Mutation(() => Product)
  async createPaymentOffer(
    @Arg("data") { id, information }: createAdvanceInformation
  ) {
    createAdvanceInformationUtil({
      id,
      information,
      type: "PaymentOffers",
    });
  }

  @Mutation(() => Product)
  async createExchangeOffer(
    @Arg("data") { id, information }: createAdvanceInformation
  ) {
    createAdvanceInformationUtil({
      id,
      information,
      type: "ExchangeOffers",
    });
  }

  @Mutation(() => Product)
  async createImage(
    @Arg("data") { id, information }: createAdvanceInformation
  ) {
    createAdvanceInformationUtil({
      id,
      information,
      type: "Images",
    });
  }

  @Mutation(() => Product)
  async updateFeatures(
    @Arg("data") { Feature, number, id }: changeFeatureInfomation
  ) {
    return changeAdvanceInfomationUtil({
      id,
      number,
      update: Feature,
      type: "Features",
    });
  }

  @Mutation(() => Product)
  async updatePaymentOffers(
    @Arg("data") { id, PaymentOffer, number }: changePaymentOffer
  ): Promise<Product | undefined> {
    return changeAdvanceInfomationUtil({
      id,
      number,
      update: PaymentOffer,
      type: "PaymentOffers",
    });
  }
  @Mutation(() => Product)
  async updateExchangeOffers(
    @Arg("data") { ExchangeOffer, number, id }: changeExchangeOffer
  ): Promise<Product | undefined> {
    return changeAdvanceInfomationUtil({
      id,
      number,
      update: ExchangeOffer,
      type: "ExchangeOffers",
    });
  }

  @Mutation(() => Product)
  async updateImages(
    @Arg("data") { Image, number, id }: changeImage
  ): Promise<Product | undefined> {
    return changeAdvanceInfomationUtil({
      id,
      number,
      update: Image,
      type: "Images",
    });
  }

  @Mutation(() => Product)
  async deleteFeature(@Arg("data") { id, number }: deleteFeature) {
    return deleteAdvanceInfomationUtil({ id, number, type: "Features" });
  }

  @Mutation(() => Product)
  async deleteExchangeOffer(@Arg("data") { id, number }: deleteFeature) {
    return deleteAdvanceInfomationUtil({ id, number, type: "ExchangeOffers" });
  }

  @Mutation(() => Product)
  async deletePaymentOffer(@Arg("data") { id, number }: deleteFeature) {
    return deleteAdvanceInfomationUtil({ id, number, type: "PaymentOffers" });
  }

  @Mutation(() => Product)
  async deleteImage(@Arg("data") { id, number }: deleteFeature) {
    return deleteAdvanceInfomationUtil({ id, number, type: "Images" });
  }
}
