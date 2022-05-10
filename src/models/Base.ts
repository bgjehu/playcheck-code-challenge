import { modelOptions } from "@typegoose/typegoose";
import { Base as TypegooseBase, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ID, ObjectType } from "type-graphql";

export interface Base extends TypegooseBase { }

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
})
@ObjectType()
export class Base extends TimeStamps {
  @Field(type => ID)
  public readonly id: string

  @Field()
  public createdAt: Date;

  @Field()
  public updatedAt: Date;
}


