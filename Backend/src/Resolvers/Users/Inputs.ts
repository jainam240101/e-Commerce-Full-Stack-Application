/** @format */

import { IsEmail, IsNumber, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class createUser {
  @Field()
  Name: string;

  @Field()
  @IsEmail()
  Email: string;

  @Field()
  @Length(8, 16)
  Password: string;

  @Field()
  @Length(10)
  PhoneNumber: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class updateUserInput {
  @Field({ nullable: true })
  Name: string;

  @Field({ nullable: true })
  @IsEmail()
  Email: string;

  @Field({ nullable: true })
  @Length(8, 16)
  Password: string;

  @Field({ nullable: true })
  PhoneNumber: string;
}

@InputType()
export class addressChange {
  @Field()
  @IsNumber()
  Number: number;

  @Field()
  @Length(1, 100)
  Address: string;
}

@InputType()
export class addAdressInput {
  @Field()
  @Length(1, 100)
  Address: string;
}

@InputType()
export class changeRoleInput {
  @Field()
  UserId: string;

  @Field()
  Role: string;
}
