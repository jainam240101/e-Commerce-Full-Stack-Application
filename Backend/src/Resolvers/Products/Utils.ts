/** @format */

import { ApolloError } from "apollo-server-express";
import { Retailer } from "../../entity/Reatilers";
import { createQueryBuilder } from "typeorm";
import { v4 as uuid } from "uuid";
import {
  Product,
  ExchangeOffer,
  Image,
  Feature,
  PaymentOffer,
} from "../../entity/Products";

interface addProductInterface {
  Name: string;
  Description: string;
  Category: string;
  Price: number;
  Quantity: number;
  SoldBy: Retailer;
  Features: [string];
  PaymentOffers: [string];
  ExchangeOffers: [string];
  Images: [string];
}

interface changeBasicInfomationProps {
  id: string;
  Name?: string;
  Description?: string;
  Category?: string;
  Quantity?: number;
  Price?: number;
  SoldBy?: string;
}

interface createAdvanceInformationProps {
  id: string;
  information: string;
  type: string;
}

interface updateAdvancedInformationProps {
  id: string;
  number: number;
  update: string;
  type: string;
}
interface deleteAdvancedInformationProps {
  id: string;
  number: number;
  type: string;
}

// Helper Functions
const createArrayObjects = (list: any[], name: string) => {
  const newList: any[] = [];
  list.map((element: any, index: number) => {
    const newObject: any = {};
    newObject["number"] = index;
    newObject[name] = element;
    newList.push(newObject);
  });
  return newList;
};

const updateArrayObjects = (
  list: any[],
  number: number,
  update: string,
  name: string
) => {
  const newList: any[] = [...list];
  newList[number][name] = update;
  // console.log(newList);
  return newList;
};

const deleteAdvanceDetail = (list: any[], number: number, name: string) => {
  const newList: any[] = [];
  var j: number = 0;
  list.map((element: any, index: number) => {
    if (index !== number) {
      const newObject: any = {};
      newObject["number"] = j;
      j = j + 1;
      newObject[name] = element[name];
      newList.push(newObject);
    }
  });
  return newList;
};

// Utility Functions

export const addProductMutation = async ({
  Description,
  ExchangeOffers,
  Features,
  Category,
  SoldBy,
  Price,
  Quantity,
  PaymentOffers,
  Images,
  Name,
}: addProductInterface): Promise<Product | undefined> => {
  console.log(SoldBy);
  try {
    const newFeatureArray: Feature[] = createArrayObjects(Features, "Feature");
    const newExchangeofferArray: ExchangeOffer[] = createArrayObjects(
      ExchangeOffers,
      "ExchangeOffer"
    );
    const newPaymentArray: PaymentOffer[] = createArrayObjects(
      PaymentOffers,
      "PaymentOffer"
    );
    const newImageArray: Image[] = createArrayObjects(Images, "Image");
    return Product.create({
      id: uuid(),
      Name: Name,
      Description: Description,
      Category: Category,
      Quantity: Quantity,
      owner: SoldBy,
      Price: Price,
      Features: newFeatureArray,
      PaymentOffers: newPaymentArray,
      ExchangeOffers: newExchangeofferArray,
      Images: newImageArray,
    });
  } catch (error) {
    throw new ApolloError(
      `Some Error was Generated when creating product ${error}`
    );
  }
};

export const createAdvanceInformationUtil = async ({
  id,
  information,
  type,
}: createAdvanceInformationProps): Promise<Product | undefined> => {
  try {
    const product: Product | undefined = await Product.findOne({
      where: {
        id: id,
      },
    });
    if (type === "Features") {
      product!.Features = createAdvanceinfo(
        product!.Features,
        information,
        "Feature"
      );
    }
    if (type === "PaymentOffers") {
      product!.PaymentOffers = createAdvanceinfo(
        product!.PaymentOffers,
        information,
        "PaymentOffer"
      );
    }
    if (type === "ExchangeOffers") {
      product!.ExchangeOffers = createAdvanceinfo(
        product!.ExchangeOffers,
        information,
        "ExchangeOffer"
      );
    }
    if (type === "Images") {
      product!.Images = createAdvanceinfo(
        product!.Images,
        information,
        "Image"
      );
    }
    return product!.save();
  } catch (error) {
    throw new ApolloError(`Error: ${error}`);
  }
};

const createAdvanceinfo = (list: any[], information: string, type: string) => {
  const newList: any[] = [...list];
  const newObj: any = {};
  newObj["number"] = newList.length;
  newObj[type] = information;
  newList.push(newObj);
  return newList;
};

export const changeBasicInformationUtil = async ({
  Name,
  Price,
  id,
  Category,
  Quantity,
  Description,
}: changeBasicInfomationProps): Promise<Product | undefined> => {
  try {
    const product: Product | undefined = await Product.findOne({
      where: {
        id: id,
      },
    });
    if (product === undefined) {
      throw new ApolloError("Product Not Found ID is invalid");
    }
    if (Name !== undefined) {
      product!.Name = Name;
    }
    if (Price !== undefined) {
      product!.Price = Price;
    }
    if (Quantity !== undefined) {
      product!.Quantity = Quantity;
    }
    if (Category !== undefined) {
      product!.Category = Category;
    }
    if (Description !== undefined) {
      product!.Description = Description;
    }
    return product.save();
  } catch (error) {
    throw new ApolloError(`Error ${error}`);
  }
};

export const deleteProductUtil = async (productId: string) => {
  try {
    await createQueryBuilder()
      .delete()
      .from(Product)
      .where("id=:id", { id: productId })
      .execute();
    return "Success";
  } catch (error) {
    throw new ApolloError(`Error ${error}`);
  }
};

export const changeAdvanceInfomationUtil = async ({
  number,
  type,
  id,
  update,
}: updateAdvancedInformationProps): Promise<Product | undefined> => {
  try {
    const product: Product | undefined = await Product.findOne({
      where: {
        id: id,
      },
    });
    if (type === "Features") {
      product!["Features"] = updateArrayObjects(
        product!.Features,
        number,
        update,
        "Feature"
      );
      return product!.save();
    }
    if (type === "ExchangeOffers") {
      // console.log(product?.ExchangeOffers);
      product!["ExchangeOffers"] = updateArrayObjects(
        product!.ExchangeOffers,
        number,
        update,
        "ExchangeOffer"
      );
      // console.log(product?.ExchangeOffers);
      return product!.save();
    }
    if (type === "PaymentOffers") {
      product!["PaymentOffers"] = updateArrayObjects(
        product!.PaymentOffers,
        number,
        update,
        "PaymentOffer"
      );
      console.log(product?.PaymentOffers);

      return product!.save();
    }
    if (type === "Images") {
      product!["Images"] = updateArrayObjects(
        product!.Images,
        number,
        update,
        "Image"
      );
      return product!.save();
    }
    return product;
  } catch (error) {
    throw new ApolloError(`Error ${error}`);
  }
};

export const deleteAdvanceInfomationUtil = async ({
  id,
  type,
  number,
}: deleteAdvancedInformationProps): Promise<Product | undefined> => {
  try {
    const product: Product | undefined = await Product.findOne({
      where: {
        id: id,
      },
    });
    if (type === "Features") {
      product!.Features = deleteAdvanceDetail(
        product!.Features,
        number,
        "Feature"
      );
    }
    if (type === "ExchangeOffers") {
      product!.ExchangeOffers = deleteAdvanceDetail(
        product!.ExchangeOffers,
        number,
        "ExchangeOffer"
      );
    }
    if (type === "PaymentOffers") {
      product!.PaymentOffers = deleteAdvanceDetail(
        product!.PaymentOffers,
        number,
        "PaymentOffer"
      );
    }
    if (type === "Images") {
      product!.Images = deleteAdvanceDetail(product!.Images, number, "Image");
    }
    return product!.save();
  } catch (error) {
    throw new ApolloError(`Error ${error}`);
  }
};
