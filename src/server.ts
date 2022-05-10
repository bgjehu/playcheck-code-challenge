// import env as the first thing before importing any other modules
import { MONGO_DB_URL, SERVER_PORT } from './env';

import mongoose from "mongoose";
import app from './app';

// main entry function
(async () => {
  // wait for db connection before starting the server
  await mongoose.connect(MONGO_DB_URL);


  app.listen(SERVER_PORT, () => {
    console.log(`Server Listening on http://localhost:${SERVER_PORT}`);
  });
})();

// close db connection before exit
process.on('beforeExit', async () => {
  await mongoose.connection.close();
});