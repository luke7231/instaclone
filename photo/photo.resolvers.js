import client from '../client';

export default {
    Photo: {
        user: ({userId}) => client.user.findUnique({
            where: {
                id: userId
            }
        }),
        hashtag: ({id}) => client.hashtag.findMany({
            where: {
                photos: {
                    some: {
                        id,
                    }
                }
            }
        }),
        likes: ({ id }) => client.like.count({
            where: {
                photoId:id
            }
        }),
        commentNumber: ({ id }) => client.comments.count({
            where: {
                photoId:id
            }
        }),
        comments: ({ id }) => client.comments.findMany({
            where: {
                photoId: id
            },
            include: {
                user: true
            }
        })
        ,
        isMine: ({ userId }, arg, { loggedUser }) => {
            if (!loggedUser) {
                return false
            }
            return userId === loggedUser.id
        },
        isLiked: async ({ id }, arg , { loggedUser }) => {
            if (!loggedUser) {
                return false
            }
            const ok = await client.like.findUnique({
                where: {
                    userId_photoId: {
                        photoId: id,
                        userId: loggedUser.id,
                        
                    },
                    
                },
                select: {
                    id: true,
                }
            })
            if (ok) {
                return true;
            }
            return false;
        }
        
        
    },
    Hashtag: {
        photos: ({ id }) => client.hashtag.findUnique({ where: { id } }).photos()
        ,
        totalPhoto: ({ id }) => client.photo.count({
            where: {
                hashtags: {
                    some: {
                        id
                    }
                }
            }
        })
    }
}