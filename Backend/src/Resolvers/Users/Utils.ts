/** @format */

import { User, Address } from "../../entity/Users";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server-express";
import { createQueryBuilder } from "typeorm";

interface createUser {
  Name: string;
  Email: string;
  Password: string;
  PhoneNumber: string;
}

interface updateUserProps {
  User: User;
  Name?: string;
  Email?: string;
  Password?: string;
  PhoneNumber?: string;
}

interface deleteUserProps {
  user: User;
}

interface addAddress {
  Number?: number;
  User: User;
  Address: string;
}
interface changeAddress {
  Number: number;
  User: User;
  Address: string;
}
interface deleteAddress {
  Number: number;
  User: User;
}

interface login {
  email: string;
  password: string;
}

export const CreateUser = async ({
  Email,
  Name,
  Password,
  PhoneNumber,
}: createUser) => {
  try {
    const hasedpassword = await bcrypt.hash(Password, 12);
    return User.create({
      id: uuid(),
      Name: Name,
      Email: Email,
      Password: hasedpassword,
      PhoneNumber: PhoneNumber,
    }).save();
  } catch (error) {
    throw new ApolloError(`Some Error generated ${error}`);
  }
};

export const LoginMutation = async ({
  email,
  password,
}: login): Promise<User | undefined> => {
  try {
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      throw new ApolloError("Email or Password Is Incorrect");
    }
    const passwordValid = await bcrypt.compare(password, user.Password);
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

export const updateUser = async ({
  User,
  Name,
  Email,
  Password,
  PhoneNumber,
}: updateUserProps) => {
  try {
    if (Name !== undefined) {
      User.Name = Name!;
    }
    if (Email !== undefined) {
      User.Email = Email!;
    }
    if (PhoneNumber !== undefined) {
      User.PhoneNumber = PhoneNumber!;
    }
    if (Password !== undefined) {
      const hasedpassword = await bcrypt.hash(Password!, 12);
      User.Password = hasedpassword;
    }
    return User.save();
  } catch (error) {
    throw new ApolloError(
      `Some Error generated while updating the user ${error}`
    );
  }
};

export const deleteUser = async ({ user }: deleteUserProps) => {
  try {
    return createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id: user.id })
      .execute();
  } catch (error) {
    throw new ApolloError(
      `Some Error generated while deleting the user ${error}`
    );
  }
};

// Adresses Util Functions
export const addAddressMutation = async ({
  User,
  Address,
}: addAddress): Promise<User | undefined> => {
  try {
    var allAdresses: Address[] = [...User.Addresses];
    var newAdress: any = {
      number: allAdresses.length,
      address: Address,
    };
    allAdresses.push(newAdress);
    User.Addresses = allAdresses;
    return User.save();
  } catch (error) {
    throw new ApolloError(
      `Some Error generated while saving the user address ${error}`
    );
  }
};

export const updateAddressMutation = async ({
  User,
  Address,
  Number,
}: changeAddress): Promise<User | undefined> => {
  try {
    const newAddress: Address[] = [...User.Addresses];
    newAddress[Number].address = Address;
    User.Addresses = newAddress;
    return User.save();
  } catch (error) {
    throw new ApolloError(
      `Some Error generated while updating the user address ${error}`
    );
  }
};

export const deleteAddressMutation = async ({
  Number,
  User,
}: deleteAddress): Promise<User | undefined> => {
  try {
    const newAddress: Address[] = [...User.Addresses];
    const Adresses: Address[] = [];
    newAddress.map((element: Address) => {
      if (element.number !== Number) {
        Adresses.push(element);
      }
    });
    User.Addresses = Adresses;
    return User.save();
  } catch (error) {
    throw new ApolloError(
      `Some Error generated while deleting the user address ${error}`
    );
  }
};

// Change Role Mutation Util Functions
interface changeRole {
  Role: string;
  UserId: string;
}
export const changeRoleutil = async ({
  Role,
  UserId,
}: changeRole): Promise<User | undefined> => {
  try {
    const user: User | undefined = await User.findOne({
      where: {
        id: UserId,
      },
    });
    if (user === undefined) {
      return undefined;
    }
    user.Role = Role;
    return user.save();
  } catch (error) {
    throw new ApolloError(`Error: ${error}`);
  }
};
