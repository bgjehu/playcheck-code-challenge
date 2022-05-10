import { prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { Base } from './Base';

@ObjectType()
export class User extends Base {
  @prop({ required: true })
  @Field(type => ID)
  public sub: string;

  @prop({ required: true })
  @Field()
  public name: string;

  @prop()
  @Field()
  public email: string;
}
