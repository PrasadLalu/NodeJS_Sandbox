import gql from 'graphql-tag';

export const productTypeDefs = gql`
    type Product {
        id: ID!
        name: String!
        description: String
        price: Float!
        in_stock: Boolean!
        category: Category!
        brand: Brand!
        createdAt: String!
        updatedAt: String!
    }
    
    extend type Query {
        products: [Product!]!
        product(id: ID!): Product
    }

    input ProductInput {
        name: String!
        description: String
        price: Float!
        in_stock: Boolean
        category: ID!
        brand: ID!
    }
    
     extend type Mutation {
        addProduct(input: ProductInput!): Product!
    }
`;