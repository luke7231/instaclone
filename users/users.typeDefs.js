import { gql } from 'apollo-server';

export default gql`
    type User{
        id: String!
        firstName: String!
        lastName: String
        userName: String!
        email: String!
        createAt: String!
        updateAt: String!
        photos: [Photo]
        bio: String
        avatar: Upload
        followings:[User]
        followers: [User]
        totalFollowing: Int!
        totalFollowers: Int!
        isFollowing: Boolean!
        isMe: Boolean!
    },
`