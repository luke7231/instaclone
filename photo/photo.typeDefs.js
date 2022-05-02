import { gql } from 'apollo-server-express';

export default gql`
    type Photo {
        id: Int!
        user: User!
        file: Upload!
        caption: String
        hashtag: [Hashtag]
        likes: Int!
        commentNumber: Int!
        comments: [Comments]
        createAt: String!
        updateAt: String!
        isMine: Boolean!
        isLiked: Boolean
    }
    type Hashtag{
        id: Int!
        hashtag: String!
        photos(page:Int): [Photo]
        totalPhoto: Int!
        createAt: String!
        updateAt: String!
    }
    type Like {
        id: Int!
        photo : Photo!
        createAt: String!
        updateAt: String!
    }
`