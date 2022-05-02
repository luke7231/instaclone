import { gql } from 'apollo-server-express';

export default gql`

    type UnfollowsResults {
        ok: Boolean
        error: String
    }

    type Mutation{
        unfollows(userName:String!): UnfollowsResults!
    }
`