import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './schema/index';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();
connectDB();

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 3000 }
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
