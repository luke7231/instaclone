import client from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        readMessage: protectResolver(async(_, { id }, { loggedUser }) => {
            const message = await client.message.findFirst({
                where: {
                    id,//
                    userId: {
                        not: loggedUser.id
                    },
                    room: {
                        users: {
                            some: {
                                id:loggedUser.id
                            }
                        }
                    }
                }
            })

            if (!message) {
                return {
                    ok: false,
                    error: "Message not Found"
                }
            }
            //읽기!
            await client.message.update({
                where: {
                    id,
                },
                data: {
                    read: true,
                }
            })
            return {
                ok: true,
            }
        })
    }
}