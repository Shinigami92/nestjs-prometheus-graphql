import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class NewCatInput {
  @Field()
  name: string;
}
