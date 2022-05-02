import { gql } from 'apollo-server-express';

export default gql`
    type togglePhotoResults{
        ok: Boolean!
        error: String
    }
    
    type Mutation{
        toggleLike(id:Int!): togglePhotoResults
    }
`