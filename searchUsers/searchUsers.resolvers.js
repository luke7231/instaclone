import client from '../client'

export default {
    Query: {
        searchUsers: async (_, { keyword , page }) => {
            const foundUserlist = await client.user.findMany({
                where: {
                    userName: {
                        startsWith: keyword
                    }
                },
                skip: (page-1) *1,
                take: 1,
            })
            return foundUserlist;
        }
    }
}