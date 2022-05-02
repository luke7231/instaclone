 require("dotenv").config();
import express from 'express';


import http from "http";// subscription 서버에 필요
import { execute, subscribe } from 'graphql';// subscription 서버에 필요
import { createServer } from 'http';// subscription 서버에 필요
import { SubscriptionServer } from 'subscriptions-transport-ws';// subscription 서버에 필요


import { ApolloServer } from "apollo-server-express";


import { graphqlUploadExpress } from 'graphql-upload';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { typeDefs, resolvers } from './schema';
import { getUser, protectResolver } from './users/users.utils';

import { schema } from './schema';


const PORT = process.env.PORT

const startApolloServer = async () => {
  
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options
      }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      }

    ],
    context: async ({ req }) => {
      return {
        loggedUser: await getUser(req.headers.authorization),
        protectResolver,
      }
    }
  })
  await server.start()

  const app = express();

  app.use(graphqlUploadExpress())
  app.use(express.static("Uploads"))
  server.applyMiddleware({ app });//

  const httpServer = createServer(app);
  const subscriptionServer = SubscriptionServer.create({
    // This is the `schema` we just created.
    schema,
    // These are imported from `graphql`.
    execute,
    subscribe,
    async onConnect({ authorization }, webSocket) {
      if (authorization) {
        const loggedInUser = await getUser(authorization)
        return { loggedInUser }
      } else {
        throw new Error("You can't listen")
      }
    }
  }, {
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // This `server` is the instance returned from `new ApolloServer`.
    path: server.graphqlPath,
  })
  
  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
}
startApolloServer(typeDefs,resolvers)