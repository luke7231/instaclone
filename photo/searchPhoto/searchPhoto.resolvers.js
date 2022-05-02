import client from '../../client';

export default {
    Query: {
        searchPhoto: (_, { keyword }) => client.photo.findMany({
            where: {
                caption: {
                    startsWith: keyword
                }
            }
        })
    }
}