/** @format */

import { IsNumber } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class insertProductDetails {
  @Field()
  Name: string;

  @Field()
  Description: string;

  @Field()
  Category: string;

  @Field()
  @IsNumber()
  Quantity: number;

  @Field()
  @IsNumber()
  Price: number;

  @Field()
  SoldBy: string;

  @Field(() => [String])
  Features: [string];

  @Field(() => [String])
  PaymentOffers: [string];

  @Field(() => [String])
  ExchangeOffers: [string];

  @Field(() => [String])
  Images: [string];
}

@InputType()
export class changeBasicInfomation {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: true })
  Name: string;

  @Field({ nullable: true })
  Description: string;

  @Field({ nullable: true })
  Category: string;

  @Field({ nullable: true })
  @IsNumber()
  Quantity: number;

  @Field({ nullable: true })
  @IsNumber()
  Price: number;
}

@InputType()
export class createAdvanceInformation {
  @Field()
  id: string;

  @Field()
  information: string;
}

@InputType()
export class changeFeatureInfomation {
  @Field({ nullable: false })
  id: string;

  @Field()
  @IsNumber()
  number: number;

  @Field()
  Feature: string;
}

@InputType()
export class changePaymentOffer {
  @Field({ nullable: false })
  id: string;

  @Field()
  @IsNumber()
  number: number;

  @Field()
  PaymentOffer: string;
}

@InputType()
export class changeExchangeOffer {
  @Field({ nullable: false })
  id: string;

  @Field()
  @IsNumber()
  number: number;

  @Field()
  ExchangeOffer: string;
}

@InputType()
export class changeImage {
  @Field({ nullable: false })
  id: string;

  @Field()
  @IsNumber()
  number: number;

  @Field()
  Image: string;
}

@InputType()
export class deleteFeature {
  @Field()
  id: string;
  @Field()
  number: number;
}
