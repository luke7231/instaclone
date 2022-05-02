import client from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        deletePhoto: protectResolver(async (_, { id }, { loggedUser }) => {
            const photo = await client.photo.findUnique({
                where: {
                    id,

                },
                select: {
                    userId:true
                },
            })
            

            if (!photo) {
                return {
                    ok: false,
                    error: "Photo not found"
                }
            } else if (photo.userId !== loggedUser.id) {
                return {
                    ok: false,
                    error: "Not authorized"
                }
            } else {
                //좋아요 있는 거 싹 다 찾고
                const likes = await client.like.findMany({
                    where: {
                        photoId:id
                    },
                    select: {
                        id: true
                    }
                })
                //댓글 있는 거 싹 다 찾고
                const comments = await client.comments.findMany({
                    where: {
                        photoId: id
                    },
                    select: {
                        id: true,
                    }
                })
                //좋아요 있으면 다 지우기
                if (likes) {
                    await client.like.deleteMany({
                        where: {
                            photoId: id
                        }
                    })
                }
                //댓글 있으면 다 지우기
                if (comments) {
                    await client.comments.deleteMany({
                        where: {
                            photoId: id
                        }
                    })
                }
                //마지막으로 사진 삭제
                await client.photo.delete({where:{id}})
            }
            return {
                ok:true
            }
        })
    }
}