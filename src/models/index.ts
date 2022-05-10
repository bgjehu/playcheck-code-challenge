import { getModelForClass } from "@typegoose/typegoose";
import { Game } from "./Game";
import { Region } from "./Region";
import { Token } from "./Token";
import { Tournament } from "./Tournament";
import { User } from "./User";

export const GameModel = getModelForClass(Game);
export const RegionModel = getModelForClass(Region);
export const TokenModel = getModelForClass(Token);
export const TournamentModel = getModelForClass(Tournament);
export const UserModel = getModelForClass(User);