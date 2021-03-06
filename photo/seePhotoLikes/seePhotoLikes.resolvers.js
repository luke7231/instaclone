import client from '../../client'

export default {
    Query: {
        seePhotoLikes: async (_, { id }) => {
            const likes = await client.like.findMany({
                where: {
                    photoId: id
                }, select: {
                    user:true
                }
            })
            console.log(likes.map(like=> like.user))
            return likes
        }
    }
}