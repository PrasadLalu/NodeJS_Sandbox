import { GraphQLError } from 'graphql';
import { StatusCodes } from 'http-status-codes';
import { Category } from '../../models/Category';

export const categoryResolvers = {
    Query: {
        categories: async () => await Category.find()
    },
    Mutation: {
        addCategory: async (_: any, { name, description }: any) => {
            const existing = await Category.findOne({ name });
            if (existing) {
                throw new GraphQLError('Product category already exists', {
                    extensions: { code: StatusCodes.CONFLICT }
                });
            }

            const brand = await Category.create({
                name,
                description,
            });
            return brand;
        }
    }
}
