import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Base } from "./Base";
import { TournamentDetails } from "./TournamentDetails";
import { User } from "./User";

@ObjectType()
export class Tournament extends Base {
  @prop({ type: () => User, required: true })
  @Field(type => User)
  public owner: DocumentType<User>;

  @prop({ type: () => TournamentDetails, required: true })
  @Field(type => TournamentDetails)
  public details: TournamentDetails

  @prop({ default: true })
  @Field()
  public ownerParticipated: boolean = true;

  @prop({ type: () => User, default: [], required: true })
  @Field(type => [User])
  public participants: DocumentType<User>[];
}
