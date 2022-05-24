const express = require('express');
require('dotenv').config({path:'.env'});
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const http = require('http');
const cors = require('cors')
const { typeDefs, resolvers } = require('./GraphQL/todos')


async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(cors())
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  app.use( (req, res) => {
          res.status(404).send({url: req.originalUrl + ' not found'})
    })
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers)
