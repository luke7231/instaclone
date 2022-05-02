import client from '../../client';
import { protectResolver } from '../../users/users.utils';
import { processHashtag } from '../photo.utils';

export default {
    Mutation: {
        editPhoto: protectResolver(async(_, { id, caption }, { loggedUser }) => {
            const oldPhoto = await client.photo.findFirst({
                where: {
                    id,
                    userId: loggedUser.id,
                },
                include: {
                    hashtags: {
                        select: {
                            hashtag:true
                        }
                    }
                }
            })

            if (!oldPhoto) {
                return {
                    ok: false,
                    error: "Photo not found"
                }
            }

            const updatedPhoto = await client.photo.update({
                where: {
                    id,
                },
                data: {
                    caption,
                    hashtags: {
                        disconnect: oldPhoto.hashtags,
                        connectOrCreate: processHashtag(caption)
                    }
                }
            })
            return {
                ok: true,
            }
        })
    }
}