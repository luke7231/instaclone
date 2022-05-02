import client from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        editComment: protectResolver(async (_, { commentId, payload }, { loggedUser }) => {
            const comment = await client.comments.findUnique({
                where: {
                    id: commentId
                },
                select: {
                    userId: true
                }
            })

            if (!comment) {
                return {
                    ok: false,
                    error: "Comment not found"
                }
            } else if (comment.userId !== loggedUser.id) {
                return {
                    ok: false,
                    error: "Not Authorized"
                }
            } else {
                await client.comments.update({
                    where: {
                        id: commentId
                    },
                    data: {
                        payload,
                    }
                })
            }
            
            return {
                ok:true,
            }
        
        })
            

    }
}