import { DocumentType } from "@typegoose/typegoose";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Tournament } from "../../models/Tournament";
import { User } from "../../models/User";
import { TournamentServices } from "../../services/TournamentServices";
import { createBaseResolver } from "./BaseResolver";
import { TournamentDetailsInput } from "./types/TournamentDetailsInput";

@Resolver(Tournament)
export class TournamentResolver extends createBaseResolver(Tournament) {
  @Mutation(returns => Tournament)
  async createTournament(
    @Arg('tournamentData') tournamentData: TournamentDetailsInput,
    @Ctx('user') owner: DocumentType<User>
  ) {
    return TournamentServices.createTournament(owner, tournamentData);
  }

  @Mutation(returns => Tournament)
  async updateTournament(
    @Arg('id') id: string,
    @Arg('tournamentData') tournamentData: TournamentDetailsInput,
    @Ctx('user') user: DocumentType<User>
  ) {
    return TournamentServices.updateTournament(user, id, tournamentData);
  }

  @Mutation(returns => Tournament)
  async joinTournament(
    @Arg('id') id: string,
    @Ctx('user') user: DocumentType<User>
  ) {
    return TournamentServices.joinTournament(user, id);
  }
}