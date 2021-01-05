/** @format */

import { isAuth } from "../../Middleware/Authentication";
import { MyContext } from "../../Types/Context";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../../entity/Users";
import {
  addAdressInput,
  addressChange,
  changeRoleInput,
  createUser,
  LoginInput,
  updateUserInput,
} from "./Inputs";
import {
  CreateUser,
  LoginMutation,
  updateUser,
  addAddressMutation,
  updateAddressMutation,
  deleteAddressMutation,
  changeRoleutil,
} from "./Utils";
import { isAdmin } from "../../Middleware/Admin";

@Resolver()
export class Users {
  @Query(() => [User])
  hello() {
    return User.find();
  }

  @Mutation(() => User)
  async CreateUser(
    @Arg("data") { Name, Email, Password, PhoneNumber }: createUser
  ): Promise<User | undefined> {
    return CreateUser({ Email, PhoneNumber, Password, Name });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async updateUser(
    @Arg("data") { Name, Password, Email, PhoneNumber }: updateUserInput,
    @Ctx() ctx: MyContext
  ): Promise<User | undefined> {
    return updateUser({
      User: ctx.req.currentUser[0],
      Email,
      Name,
      Password,
      PhoneNumber,
    });
  }

  @Mutation(() => User)
  async Login(
    @Arg("data") { email, password }: LoginInput
  ): Promise<User | undefined> {
    return LoginMutation({ email, password });
  }

  // Addresses Mutation
  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async AddAddress(
    @Arg("data") { Address }: addAdressInput,
    @Ctx() ctx: MyContext
  ): Promise<User | undefined> {
    return addAddressMutation({ User: ctx.req.currentUser[0], Address });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async changeAddress(
    @Arg("data") { Address, Number }: addressChange,
    @Ctx() ctx: MyContext
  ): Promise<User | undefined> {
    return updateAddressMutation({
      User: ctx.req.currentUser[0],
      Address,
      Number,
    });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async deleteAddress(
    @Arg("Number") Number: number,
    @Ctx() ctx: MyContext
  ): Promise<User | undefined> {
    return deleteAddressMutation({ User: ctx.req.currentUser[0], Number });
  }

  // Roles Mutation
  @UseMiddleware(isAuth, isAdmin)
  @Mutation(() => User)
  async ChangeRole(
    @Arg("data") { Role, UserId }: changeRoleInput
  ): Promise<User | undefined> {
    return changeRoleutil({ Role, UserId });
  }
}
