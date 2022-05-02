import client from '../../client';
import { protectResolver } from '../users.utils';

export default {
    Query: {
        me: protectResolver((_, __, { loggedUser }) => {
            const user = client.user.findUnique({
                where: {
                    id: loggedUser.id,
                }
            })
            return user;
        })
    }
}