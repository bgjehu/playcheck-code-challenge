// import env as the first thing before importing any other modules
import { MONGO_DB_URL } from "../src/env";
import mongoose from "mongoose";
import { GameModel, RegionModel, TokenModel, UserModel } from "../src/models"

(async () => {
  // seed data
  const collectionSeeds = [
    {
      model: GameModel,
      documents: [
        {
          name: 'League of Legends: Wild Rift',
        },
        {
          name: 'Hearthstone: Battlegrounds',
        },
        {
          name: 'Yu-Gi-Oh! Master Duel',
        },
        {
          name: 'Pokémon Sword and Shield',
        },
      ]
    },
    {
      model: RegionModel,
      documents: [
        {
          name: 'China',
        },
        {
          name: 'Turkey',
        },
        {
          name: 'North America',
        },
        {
          name: 'South East Asia',
        },
      ]
    },
    {
      model: TokenModel,
      documents: [
        {
          name: 'RMB',
        },
        {
          name: 'TRY',
        },
        {
          name: 'USD',
        },
        {
          name: 'Ether',
        },
      ]
    },
    {
      model: UserModel,
      documents: [
        {
          sub: 'faker',
          name: 'Faker'
        },
        {
          sub: 'uzi',
          name: 'Uzi',
        }
      ]
    }
  ];
  // connect db
  await mongoose.connect(MONGO_DB_URL);
  // seed concurrently
  await Promise.all(collectionSeeds.map(({ model, documents }) => Promise.all(documents.map(document => model.create(document)))));
  // disconnect db
  await mongoose.connection.close();
})()