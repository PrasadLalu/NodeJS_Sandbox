import gql from 'graphql-tag';

export const brandTypeDefs = gql`
    type Brand {
        id: ID!
        name: String!
        description: String
        logo: String
        status: Boolean!
        createdAt: String!
        updatedAt: String!
    }
    
    extend type Query {
        brands: [Brand!]!
    }

    extend type Mutation {
        addBrand(name: String!, description: String, logo: String): Brand!
    }
`;
