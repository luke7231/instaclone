import client from '../client';
import { protectResolver } from '../users/users.utils';

export default {
    Mutation: {
        follows: protectResolver(async (_, { userName }, { loggedUser }) => {
            const ok = await client.user.findUnique({where:{userName}})
            if (!ok) {
                return {
                    ok: false,
                    error: "Cant find the user"
                }
            }
            await client.user.update({
                where: {
                    id: loggedUser.id
                },
                data: {
                    followings: {
                        connect: {
                            userName,
                        }
                    }
                }
            })
            return {
                ok: true,
                error: ""
            }
        })
    }
}