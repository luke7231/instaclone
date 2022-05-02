import { PrismaClient } from '.prisma/client';
import client from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        createComment: protectResolver(async(_, { photoId, payload }, { loggedUser }) => {
            const ok = await client.photo.findUnique({
                where: {
                    id:photoId
                }
            })
            if (!ok) {
                return {
                    ok: false,
                    error: 'photo not found'
                }
            }
            const newComment = await client.comments.create({
                data: {
                    payload,
                    user: {
                        connect: {
                            id: loggedUser.id
                        }
                    },
                    photo: {
                        connect: {
                            id: photoId
                        }
                    
                    }
                }
            })
            return {
                ok: true,
                id: newComment.id
            }
        })
    }
}