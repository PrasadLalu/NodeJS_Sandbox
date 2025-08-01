import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { userTypeDefs } from './typeDefs/user';
import { userResolvers } from './resolvers/user';
import { categoryTypeDefs } from './typeDefs/category';
import { categoryResolvers } from './resolvers/category';
import { brandTypeDefs } from './typeDefs/brand';
import { brandResolvers } from './resolvers/brand';

export const typeDefs = mergeTypeDefs([
  `type Query`,
  `type Mutation`,
  userTypeDefs,
  brandTypeDefs,
  categoryTypeDefs,
]);

export const resolvers = mergeResolvers([
  userResolvers,
  brandResolvers,
  categoryResolvers,
]);
