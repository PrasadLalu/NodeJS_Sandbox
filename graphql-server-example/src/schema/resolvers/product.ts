import { Product } from '../../models/Product';

export const productResolvers = {
    Query: {
        products: async () => await Product.find().populate('category').populate('brand'),
        product: async (_: any, { id }: { id: string }) =>
            await Product.findById(id).populate('category').populate('brand'),
    },
    Mutation: {
        addProduct: async (_: any, { input }: any) => {
            const { name, description, price, in_stock = true, category, brand } = input;

            const product = new Product({
                name,
                description,
                price,
                in_stock,
                category,
                brand,
            });
            return await product.save();
        },
    },
}
