/** @format */

import jwt from "jsonwebtoken";
import {
  createRetailerinterface,
  loginInterface,
  updateRetailerinterface,
} from "./interfaceInput";
import { Retailer } from "../../../entity/Reatilers";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { ApolloError } from "apollo-server-express";
import { createQueryBuilder } from "typeorm";

export const createRetailerUtil = async ({
  Address,
  Email,
  Password,
  CustomerCareNumber,
  Name,
}: createRetailerinterface) => {
  try {
    const hasedpassword: string = await bcrypt.hash(Password, 12);
    return Retailer.create({
      id: uuid(),
      Name,
      Address,
      Email,
      Password: hasedpassword,
      CustomerCareNumber,
    }).save();
  } catch (error) {
    throw new ApolloError(`Errror: ${error}`);
  }
};

export const loginRetailerUtil = async ({
  Password,
  Email,
}: loginInterface) => {
  try {
    const user = await Retailer.findOne({ where: { Email: Email } });
    if (!user) {
      throw new ApolloError("Email or Password Is Incorrect");
    }
    const passwordValid = await bcrypt.compare(Password, user.Password);
    if (!passwordValid) {
      throw new ApolloError("Email or Password Is Incorrect");
    }
    const token = jwt.sign({ id: user.id }, "kickass-project");
    user.token = token;
    return user;
  } catch (error) {
    throw new ApolloError(`Email or Password Is Incorrect ${error}`);
  }
};

export const updateRetailerUtil = async ({
  Address,
  CustomerCareNumber,
  Email,
  Name,
  Password,
  Retailer,
}: updateRetailerinterface) => {
  try {
    if (Name !== undefined) {
      Retailer!.Name = Name!;
    }
    if (Email !== undefined) {
      Retailer!.Email = Email!;
    }
    if (CustomerCareNumber !== undefined) {
      Retailer!.CustomerCareNumber = CustomerCareNumber!;
    }
    if (Address !== undefined) {
      Retailer!.Address = Address!;
    }
    if (Password !== undefined) {
      const hasedpassword = await bcrypt.hash(Password!, 12);
      Retailer!.Password = hasedpassword;
    }
    return Retailer!.save();
  } catch (error) {
    throw new ApolloError(`Errror: ${error}`);
  }
};

export const deleteRetailerUtil = async (id: string) => {
  try {
    return createQueryBuilder()
      .delete()
      .from(Retailer)
      .where("id = :id", { id: id })
      .execute();
  } catch (error) {
    throw new ApolloError(
      `Some Error generated while deleting the user ${error}`
    );
  }
};
