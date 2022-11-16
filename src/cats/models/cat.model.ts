import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "Cats" })
export class Cat {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}
