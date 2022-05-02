import client from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        deleteComment: protectResolver(async(_, { id }, { loggedUser }) => {
            const comment = await client.comments.findUnique({
                where: {
                    id,
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
                    error: "Not authorized"
                }
            } else {
                await client.comments.delete({where:{id}})
            }
            return {
                ok: true,
            }
            
        })
    }
}