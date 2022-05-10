import { Resolver } from "type-graphql";
import { Game } from "../../models/Game";
import { Region } from "../../models/Region";
import { Token } from "../../models/Token";
import { createBaseResolver } from "./BaseResolver";

export const baseResolvers = [
  Game,
  Region,
  Token,
].map(klass => {
  @Resolver() class AResolver extends createBaseResolver(klass) { };
  return AResolver;
});