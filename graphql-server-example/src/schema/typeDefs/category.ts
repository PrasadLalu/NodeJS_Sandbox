import gql from 'graphql-tag';

export const categoryTypeDefs = gql`
    type Category {
        id: ID!
        name: String!
        description: String
        status: Boolean!
        createdAt: String!
        updatedAt: String!
    }
    
    extend type Query {
        categories: [Category!]!
    }

    extend type Mutation {
        addCategory(name: String!, description: String): Category!
    }
`;
