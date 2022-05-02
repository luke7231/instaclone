import { gql } from 'apollo-server-express';

export default gql`
    type Message {
        id: Int!
        user: User!
        room: Room!
        payload: String!
        read: Boolean!
        createAt: String!
        updateAt: String!
    }
    type Room {
        id: Int!
        users: [User]
        messages: [Message]
        unreadTotal: Int
        createAt: String!
        updateAt: String!
    }
`
