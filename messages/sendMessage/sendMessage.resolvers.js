import client from '../../client';
import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        sendMessage: protectResolver(async(_, { payload, roomId, userId }, { loggedUser }) => {
            let room = null;

            if (userId) {//방이없고 유저에게 처음 말을 건다면 !
                const user = await client.user.findUnique({
                    where: {
                        id: userId
                    },
                    select: {
                        id: true
                    }
                })
                if (!user) {
                    return {
                        ok: false,
                        error: "User not found"
                    }
                }
                room = await client.room.create({
                    data: {
                        users: {
                            connect: [
                                {
                                    id:loggedUser.id
                                },
                                {
                                    id:user.id
                                } 
                            ]
                        }
                    }
                }) 
            } else if (roomId) {//이미 방이 존재한다면 !
                room = await client.room.findUnique({
                    where: {
                        id: roomId
                    }
                })
            }
            const message = await client.message.create({
                data: {
                    payload,
                    user: {
                        connect: {
                            id: loggedUser.id
                        }
                    },
                    room: {
                        connect: {
                            id: room.id
                        }
                    }
                }
            })
            pubsub.publish(NEW_MESSAGE,{roomUpdates:{...message}})
            return {
                ok:true
            }
        })
    }
}