import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { userTypeDefs } from './typeDefs/user';
import { userResolvers } from './resolvers/user';
import { categoryTypeDefs } from './typeDefs/category';
import { categoryResolvers } from './resolvers/category';
import { brandTypeDefs } from './typeDefs/brand';
import { brandResolvers } from './resolvers/brand';
import { productTypeDefs } from './typeDefs/product';
import { productResolvers } from './resolvers/product';

export const typeDefs = mergeTypeDefs([
  `type Query`,
  `type Mutation`,
  userTypeDefs,
  brandTypeDefs,
  productTypeDefs,
  categoryTypeDefs,
]);

export const resolvers = mergeResolvers([
  userResolvers,
  brandResolvers,
  productResolvers,
  categoryResolvers,
]);
