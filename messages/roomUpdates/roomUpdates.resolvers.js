import { withFilter } from 'graphql-subscriptions';
import client from '../../client';
import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';

export default {
    Subscription: {
        roomUpdates: {
            subscribe: async (root, args, context, info) => {
                console.log(context)
                const room = await client.room.findFirst({
                    where: {
                        id: args.id,
                        users: {
                            some: {
                                id: context.loggedInUser.id
                            }
                        }
                    },
                    select: {
                        id: true
                    }
                })
                if (!room) {
                    throw new Error("room not found")
                }
                console.log(room)
                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    ({ roomUpdates }, { id }) => {
                        return roomUpdates.roomId === id
                    
                    }
                )(root,args,context,info)
            }
            
        }
    }
} 