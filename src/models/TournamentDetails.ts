import { DocumentType, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Game } from "./Game";
import { Region } from "./Region";
import { Token } from "./Token";

@ObjectType()
export class TournamentDetails {
  @prop({ type: () => Game, required: true })
  @Field(type => Game)
  public game: DocumentType<Game>;

  @prop({ type: () => Region, required: true })
  @Field(type => Region)
  public region: DocumentType<Region>;

  @prop({ type: () => Token, required: true })
  @Field(type => Token)
  public token: DocumentType<Token>;
}
