/** @format */

import "reflect-metadata";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Express, { Application } from "express";
import { createConnection } from "typeorm";
import { Users } from "./Resolvers/Users/Index";
import { ProductResolver } from "./Resolvers/Products/Index";
import { Retailers } from "./Resolvers/Retailers/Index";

const main = async () => {
  const port = 5000;
  const schema = await buildSchema({
    resolvers: [Users, ProductResolver, Retailers],
  });
  const apolloserver = new ApolloServer({
    schema: schema,
    playground: true,
    context: ({ req }: any) => ({ req }),
  });

  let retries = 5;
  while (retries) {
    try {
      await createConnection();
      break;
    } catch (error) {
      console.log(error);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  const app: Application = Express();
  apolloserver.applyMiddleware({ app });
  const httpServer = createServer(app);
  apolloserver.installSubscriptionHandlers(httpServer);
  httpServer.listen(port, () => {
    console.log(
      `🚀  Server ready at http://localhost:${port}${apolloserver.graphqlPath}`
    );
  });
};
main();
