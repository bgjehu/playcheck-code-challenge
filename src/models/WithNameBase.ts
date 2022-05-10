import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Base } from "./Base";

@ObjectType()
export class WithNameBase extends Base {
  @prop({ required: true })
  @Field()
  public name: string;
}
