import { ApolloServer } from "apollo-server-express";
import {
    ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from "apollo-server-core";
import {ResolversType, TypeDefs } from "./types"
import express from "express"
import http from "http"
import { resolvers, typeDefs } from "./typeDefs";
import cors from "cors"
import helmet from "helmet"
import logger from "./logger";

//handlers for devs errors
process.on("unhandledRejection", async (reason, _resolve) => {
    console.log("unhandledRejection reason:", reason);
})

async function startApolloServer(typeDefs:TypeDefs, resolvers: ResolversType) {
  try {
    
    const app = express()
    app.use(cors())
    // app.use(helmet())
  
    const httpServer = http.createServer(app)
    
    const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
  });
  
  await server.start()
  server.applyMiddleware({
    app,
    path:"/"
  })

  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
} catch (error) {
 logger.error(`${error.message} - ${error.stack}`)
}
}

startApolloServer(typeDefs, resolvers)