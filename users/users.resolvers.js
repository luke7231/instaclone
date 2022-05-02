import client from '../client'

export default {
    User: {
        totalFollowing: (parent) => client.user.count({ where: { followers: { some: { id: parent.id } } } }),
        totalFollowers: (parent) => client.user.count({ where: { followings: { some: { id: parent.id } } } }),
        isMe: (parent, _, { loggedUser }) => {
            if (!loggedUser) {
                return false;
            }
            return parent.id === loggedUser.id
        },
        isFollowing: async ({ id }, _, { loggedUser }) => {
            if (!loggedUser) {
                return false
            }
            const exist = await client.user.findUnique({ where: { userName: loggedUser.userName } }).followings({ where: { id } })//await가 도대체 뭐길래!!!!!!!!
            return exist.length !== 0
        },
        photos: ({ id }) => {
            return client.photo.findMany({
                where: {
                    userId: id
                }
            })
        }
        

        
    }
}
//totalFollowers: () => 333,
        //isFollowing: () => true,
        //isME: () => true
