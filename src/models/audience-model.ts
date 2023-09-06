import { Field, ObjectType } from "type-graphql";
import { Campaign } from "./campaign-model";
import { Device, Gender } from "@prisma/client";

@ObjectType()
export class Audience {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  device: Device;

  @Field()
  gender: Gender;

  @Field()
  minAge: number;

  @Field()
  maxAge: number;

  @Field()
  minScore: number;

  @Field()
  maxScore: number;

  @Field()
  negative: boolean;

  @Field()
  debug: boolean;

  @Field(() => [Campaign])
  campaigns: Campaign[];
}
