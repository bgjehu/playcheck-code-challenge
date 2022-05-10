import { Field, InputType } from "type-graphql";

@InputType()
export class ListOptionsInput {
  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  offset?: number;
}