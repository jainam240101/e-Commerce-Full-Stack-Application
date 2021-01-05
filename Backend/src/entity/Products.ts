/** @format */

import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Retailer } from "./Reatilers";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id: string;

  @Field()
  @Column()
  Name: string;

  @Field()
  @Column()
  Description: string;

  @Field(() => Retailer)
  @Column()
  ownerId: string;
  @ManyToOne(() => Retailer, (retailer) => retailer.products)
  @JoinColumn({ name: "ownerId" })
  owner: Retailer;

  @Field()
  @Column({ default: 0 })
  Quantity: number;

  @Field()
  @Column()
  Category: string;

  @Field()
  @Column()
  Price: number;

  @Field(() => [Number], { nullable: true })
  @Column({ type: "jsonb", default: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } })
  stars: number[];

  @Field(() => [Feature])
  @Column({ type: "jsonb", nullable: true, default: [] })
  Features: Feature[];

  @Field(() => [PaymentOffer])
  @Column({ type: "jsonb", nullable: true, default: [] })
  PaymentOffers: PaymentOffer[];

  @Field(() => [ExchangeOffer])
  @Column({ type: "jsonb", nullable: true, default: [] })
  ExchangeOffers: ExchangeOffer[];

  @Field(() => [Image])
  @Column({ type: "jsonb", nullable: true, default: [] })
  Images: Image[];
}

@ObjectType()
export class Feature {
  @Field()
  number: number;

  @Field()
  Feature: string;
}
@ObjectType()
export class PaymentOffer {
  @Field()
  number: number;

  @Field()
  PaymentOffer: string;
}
@ObjectType()
export class ExchangeOffer {
  @Field()
  number: number;

  @Field()
  ExchangeOffer: string;
}
@ObjectType()
export class Image {
  @Field()
  number: number;

  @Field()
  Image: string;
}
