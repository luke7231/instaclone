import client from '../../client'

export default {
    Query: {
        seePhotoComments: (_, { id }) => client.comments.findMany({
            where: {
                photoId: id
            },
            orderBy: {
                createAt: "asc"
            }
        })
    }
}