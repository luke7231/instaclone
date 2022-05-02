import client from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Query: {
        seeRoom: protectResolver((_, { id }, { loggedUser }) => client.room.findFirst({
            where: {
                id,
                users: {
                    some: {
                        id: loggedUser.id
                    }
                },
                
            }
        }))
    }
}