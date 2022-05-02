import { gql } from 'apollo-server-express';

export default gql`
    type editCommentResults{
        ok: Boolean!
        error: String
    }
    type Mutation{
        editComment(commentId:Int! payload:String): editCommentResults
    }
`