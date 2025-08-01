import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { userTypeDefs } from './typeDefs/user';
import { userResolvers } from './resolvers/user';

export const typeDefs = mergeTypeDefs([
  `type Query`,
  `type Mutation`,
  userTypeDefs
]);

export const resolvers = mergeResolvers([
  userResolvers
]);
