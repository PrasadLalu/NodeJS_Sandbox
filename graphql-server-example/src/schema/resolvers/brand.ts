import { GraphQLError } from 'graphql';
import { Brand } from '../../models/Brand';
import { StatusCodes } from 'http-status-codes';

export const brandResolvers = {
    Query: {
        brands: async () =>  await Brand.find()            
    },
    Mutation: {
        addBrand: async (_: any, { name, description, logo }: any) => {
            try {
                const existing = await Brand.findOne({ name });
                if (existing) {
                    throw new GraphQLError('Product brand already exists', {
                        extensions: { code: StatusCodes.CONFLICT }
                    });
                }

                const brand = new Brand({ name, description, logo });
                return await brand.save();
            } catch (err) {
                console.error('Error adding brand:', err);
                throw new Error('Failed to add brand');
            }
        }
    }
}
