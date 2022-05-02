import client from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Query: {
        seeFeed: protectResolver(async(_, {offset}, { loggedUser }) => await client.photo.findMany({
            where: {
                OR: [
                    { // 조건 
                        user: {
                            followers: {
                                some: {
                                    id: loggedUser.id
                                }
                            }
                        }
                    },
                    {
                        userId: loggedUser.id
                    }
                ]
            },
            orderBy: {
                createAt: "desc"
            },
            take: 2,
            skip: offset,
        })
        )
    }
}