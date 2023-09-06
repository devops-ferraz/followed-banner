import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
