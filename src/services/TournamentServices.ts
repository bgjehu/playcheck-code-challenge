import { DocumentType } from "@typegoose/typegoose";
import { DocumentNotFound } from "../errors/DocumentNotFound";
import { OperationForbidden } from "../errors/OperationForbidden";
import { GameModel, RegionModel, TokenModel, TournamentModel } from "../models";
import { User } from "../models/User";
import { TournamentDetailsInput } from "../graphql/resolvers/types/TournamentDetailsInput";
import { Game } from "../models/Game";
import { Region } from "../models/Region";
import { Token } from "../models/Token";

export class TournamentServices {
  /**
   * Use IDs to find db documents of tournament details
   * @param param.gameId Game document id
   * @param param.regionId Region document id
   * @param param.tokenId Token document id
   * @returns found db documents in an object
   */
  static async fetchDetails({ gameId, regionId, tokenId }: TournamentDetailsInput): Promise<Record<string, DocumentType<Game | Region | Token>>> {
    const [game, region, token] = await Promise.all([
      GameModel.findById(gameId).exec(),
      RegionModel.findById(regionId).exec(),
      TokenModel.findById(tokenId).exec(),
    ]);
    if (!game) {
      throw new DocumentNotFound(GameModel, gameId);
    }
    if (!region) {
      throw new DocumentNotFound(RegionModel, regionId);
    }
    if (!token) {
      throw new DocumentNotFound(TokenModel, tokenId);
    }
    return { game, region, token };
  }

  /**
   * Create a new tournament and return the tournament data
   * @param owner the owner of the tournament, the one created the tournament
   * @param tournamentDetails tournament details
   * @returns newly created tournament serialized data
   */
  static async createTournament(owner: DocumentType<User>, tournamentDetails: TournamentDetailsInput) {
    const details = await TournamentServices.fetchDetails(tournamentDetails);
    const newTournament = await TournamentModel.create({ owner, details, });
    return newTournament.toJSON();
  }

  /**
   * Update the tournament for the user if user has the permission
   * @param user user who tries to update given tournament
   * @param tournamentId ID of the tournament to update
   * @param tournamentDetails details of the tournament to update
   * @returns update tournament serialized data
   */
  static async updateTournament(user: DocumentType<User>, tournamentId: string, tournamentDetails: TournamentDetailsInput) {
    const tournament = await TournamentModel.findById(tournamentId).exec();
    if (!tournament) {
      throw new DocumentNotFound(TournamentModel, tournamentId);
    }
    if (tournament.owner.id !== user.id) {
      throw new OperationForbidden(`User(${user.id}) has no permission to update Tournament(${tournamentId}).`);
    }
    const details = await TournamentServices.fetchDetails(tournamentDetails);
    const updatedTournament = await TournamentModel.findByIdAndUpdate(tournamentId, { details }, { new: true }).exec();
    return updatedTournament.toJSON();
  }

  /**
   * Add given user to given tournament as a participants unless the user is the owner of the participant
   * @param user user to add to tournament
   * @param tournamentId ID of the tournament
   * @returns tournament serialized data with given user added
   */
  static async joinTournament(user: DocumentType<User>, tournamentId: string) {
    let tournament = await TournamentModel.findById(tournamentId).exec();
    if (!tournament) {
      throw new DocumentNotFound(TournamentModel, tournamentId);
    }
    if (tournament.owner.id === user.id) {
      if (!tournament.ownerParticipated) {
        tournament.ownerParticipated = true;
        tournament = await tournament.save();
      }
    } else if (!tournament.participants.find(participant => participant.id === user.id)) {
      tournament.participants.push(user);
      tournament = await tournament.save();
    }
    return tournament.toJSON();
  }
}