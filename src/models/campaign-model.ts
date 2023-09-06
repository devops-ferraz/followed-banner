import { Field, ObjectType } from "type-graphql";
import { Audience } from "./audience-model";

@ObjectType()
export class Campaign {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  campaignUrl: string;

  @Field()
  startDate: string;

  @Field()
  finalDate: string;

  @Field()
  dailyLimit: number;

  @Field()
  haveLimitDaily: boolean;

  @Field()
  limitCpc: number;

  @Field()
  haveLimitCpc: boolean;

  @Field()
  campaignValue: number;

  @Field()
  imagePath: string;

  @Field()
  description: string;

  @Field()
  registrationDate: Date;

  @Field(() => [Audience])
  audiences: Audience[];
}
