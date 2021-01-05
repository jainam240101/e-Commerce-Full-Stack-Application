/** @format */

import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class createRetailerInput {
  @Field()
  Name: string;

  @Field()
  @IsEmail()
  Email: string;

  @Field()
  @Length(8, 16)
  Password: string;

  @Field()
  CustomerCareNumber: string;

  @Field()
  Address: string;
}

@InputType()
export class LoginReatailerInput {
  @Field()
  @IsEmail()
  Email: string;

  @Field()
  @Length(8, 16)
  Password: string;
}

@InputType()
export class updateRetailerInput {
  @Field({ nullable: true })
  Name: string;

  @Field({ nullable: true })
  @IsEmail()
  Email: string;

  @Field({ nullable: true })
  @Length(8, 16)
  Password: string;

  @Field({ nullable: true })
  CustomerCareNumber: string;

  @Field({ nullable: true })
  Address: string;
}
