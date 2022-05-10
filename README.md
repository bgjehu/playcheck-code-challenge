# PlayCheck Coding Challenge

## Intro
The project is a personal coding practice. Do NOT use it for production. It has a couple entities:
* GraphQL API endpoints
* GraphQL client web app
* Postman Test suite for the API endpoints
* Mongodb in a Docker container

## Initialize
1. Spin up the DB
```
docker compose up
```
2. Seed the DB
```
npm run seed
```

## Development
This project uses typescript everywhere. For GraphQL, it uses TypeGraph. For MongoDB, it uses TypeGoose. And everything else is the business logic in between. And they served by Express.js. For development, everything is run with `ts-node`. Source code should be transplied if for production.

To start the dev server
```
npm run dev
```

## Testing
The test script starts a server with the GraphQL API endpoints, and then uses newman.js to run Postman Collections.
To run
```
npm run test
```

## TODO
1. Split APIs and web app into two servers but connected with docker compose.
2. Use different databases for different entities or purposes.
3. Add unit tests.
4. Add linting.
5. Add watching code change and auto restart server.