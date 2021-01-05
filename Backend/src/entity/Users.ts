/** @format */

import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
export class Address {
  @Field()
  number: number;

  @Field()
  address: string;
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
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
  @Column({ unique: true })
  PhoneNumber: string;

  @Field()
  @Column({ default: "Customer" })
  Role: string;

  @Field(() => [Address], { nullable: true })
  @Column({ type: "jsonb", nullable: true, default: [] })
  Addresses: Address[];

  @Field()
  @Column()
  Password: string;

  @Field()
  token: string;
}
