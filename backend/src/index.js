const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
require('dotenv').config();

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function startServer() {
  const app = express();
  
  // Enable CORS
  app.use(cors({
    origin: 'http://localhost:5173', // Vite dev server
    credentials: true
  }));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Add authentication context here if needed
      return {
        req
      };
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});