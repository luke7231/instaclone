import { gql } from 'apollo-server-express';

export default gql`
    type Mutation{
        follows(userName:String!):FollowsResults
    }
    type FollowsResults{
        ok: Boolean!
        error: String
    }
`