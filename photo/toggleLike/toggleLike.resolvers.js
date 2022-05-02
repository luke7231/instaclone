import { PrismaClient } from '.prisma/client';
import client from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        toggleLike: protectResolver(async (_, { id }, { loggedUser }) => {
            console.log(loggedUser)
            const existing = await client.photo.findUnique({
                where: {id}
            })
            if (!existing) {
                return {
                    ok: false,
                    error: "Photo not found"
                }
            }
            const like = await client.like.findUnique({
                where: {
                    userId_photoId: {
                        userId: loggedUser.id,
                        photoId: id,
                    }
                }
            })
            if (like) {
                await client.like.delete({
                    where: {
                        userId_photoId: {
                            userId: loggedUser.id,
                            photoId: id,
                        }
                    }
                })
            } else {
                await client.like.create({
                    data: {
                        user: {
                            connect: {
                                id: loggedUser.id
                            }
                        },
                        photo: {
                            connect: {
                                id: existing.id
                            }
                        }
                    }
                })
            }
            return {
                ok: true,
            }
        })
    }
}