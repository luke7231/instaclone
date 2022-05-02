import client from '../client';
import { protectResolver } from '../users/users.utils';

export default {
    Mutation: {
        unfollows: protectResolver(async (_, { userName }, { loggedUser }) => {
            const ok = client.user.findUnique({ where: { userName } })
            if (!ok) {
                return {
                    ok: false,
                    error: "Cant find user"
                }
            }
            await client.user.update({
                where: {
                    id: loggedUser.id
                },
                data: {
                    followings: {
                        disconnect: {
                            userName,
                        }
                    }
                }
            })
            return {
                ok: true,
                error:""
            }
        })
    }
}