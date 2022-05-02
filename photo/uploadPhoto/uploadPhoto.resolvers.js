
import client from '../../client';
import { uploadToS3 } from '../../shared/shared.utils';
import { protectResolver } from '../../users/users.utils';
import { processHashtag } from '../photo.utils';

export default {
    Mutation: {
        uploadPhoto: protectResolver(async(_, { file, caption }, { loggedUser }) => {
            let hashtagObjs = [];
            if (caption) {
                hashtagObjs = processHashtag(caption)
            }
            const fileUrl = await uploadToS3(file, loggedUser.id, "upload")
            console.log(fileUrl)
            const newPhoto = await client.photo.create({
                data: {
                    file: fileUrl,
                    caption,
                    user: {
                        connect: {
                            id:loggedUser.id
                        }
                    },
                    ...(hashtagObjs.length > 0 && {
                        hashtags: {
                            connectOrCreate: hashtagObjs
                        }
                    })
                }
            })
            return newPhoto
        })
    }
}