import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Audience {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  device: string; //TODO Deve ser mapeado para o tipo adequado

  @Field()
  gender: string; //TODO Deve ser mapeado para o tipo adequado

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
}
