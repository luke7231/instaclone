import client from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Query: {
        seeRooms: protectResolver((_, args, { loggedUser }) => client.room.findMany({
            where: {
                users: {
                    some: {
                        id: loggedUser.id
                    }
                }
            }
        }))
    }
}