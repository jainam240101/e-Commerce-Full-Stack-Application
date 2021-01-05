/** @format */

import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Product } from "./Products";

@ObjectType()
@Entity()
export class Retailer extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  Name: string;

  @Field()
  @Column({ unique: true })
  Email: string;

  @Field()
  @Column({ default: "Retailer" })
  Role: string;

  @Field()
  @Column()
  Password: string;

  @Field()
  @Column({ unique: true })
  CustomerCareNumber: string;

  @Field()
  @Column()
  Address: string;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.owner)
  products: Product[];

  @Field()
  token: string;
}
