import client from '../../client';

export default {
    Query: {
        seeProfile: (_, { userName }) => {
            const foundUser = client.user.findUnique({
                where: {
                    userName: userName
                },
                include: {
                    followings: true,
                    followers:true,
                }
            })
            return foundUser
        }
    }
}