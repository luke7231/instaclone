import client from '../../client'
import bcrypt from 'bcrypt'
import { GraphQLUpload, Upload } from 'graphql-upload';
import { protectResolver } from '../users.utils';
import { uploadToS3 } from '../../shared/shared.utils';



const resolverFn = async (_, { firstName, lastName, userName, email, password: newPassword, bio, avatar }, { loggedUser }) => {
    let avatarUrl = null
    if (avatar) {
        avatarUrl = await uploadToS3(avatar , loggedUser.id, "avatar")
        // Upload: GraphQLUpload
        // const { createReadStream, filename } = await avatar.file
        // const newFilename = `${loggedUser.id}-${Date.now()}-${filename}`
        // const stream = createReadStream();
        // const writeStream = fs.createWriteStream(`${process.cwd()}/Uploads/${newFilename}`)
        // stream.pipe(writeStream)
        // avatarUrl = `http://localhost:4000/${newFilename}`
    }
    let uglyPassword = null;
    if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10)
    }
    const updatedUser = await client.user.update({
        where: {
            id: loggedUser.id
        },
        data: {
            firstName,
            lastName,
            userName,
            email,
            bio,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatar: avatarUrl })
        }
    });
    if (updatedUser.id) {
        return updatedUser;
    } else {
        return null;
    }
}

export default {
    Mutation: {
        editProfile: protectResolver(resolverFn)
    }
}