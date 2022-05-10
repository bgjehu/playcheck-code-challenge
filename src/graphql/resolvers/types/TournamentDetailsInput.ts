import { Field, InputType } from "type-graphql";

@InputType()
export class TournamentDetailsInput {
  @Field()
  gameId: string;

  @Field()
  regionId: string;

  @Field()
  tokenId: string;
}