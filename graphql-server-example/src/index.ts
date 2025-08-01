import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { resolvers, typeDefs } from './schema/index';
import { getUserFromToken } from './utils/auth';

dotenv.config({ path: '.env.local', quiet: true });
connectDB();

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 3000 },
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await getUserFromToken(token);
    return { user };
  }
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
