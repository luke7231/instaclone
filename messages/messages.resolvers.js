import client from '../client';

export default {
    Room: {
        users: ({id}) => client.room.findUnique({where:{id}}).users(),
        messages: ({ id }) => client.message.findMany({
            where: {
                roomId: id
            },
        }),
        unreadTotal: ({ id }, args, { loggedUser }) => client.message.count({
            where: {
                read: false,
                roomid: id,
                user: {
                    id: {
                        not: loggedUser.id
                    }
                }
            }
        })
    }
}