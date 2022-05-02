import AWS from 'aws-sdk';
import { GraphQLUpload  } from 'graphql-upload';

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET
    }
})

export const uploadToS3 = async (file, userId, folderName) => {
    Upload: GraphQLUpload
    const { createReadStream, filename } = await file.file
    const readStream = createReadStream();
    const ObjName = `${folderName}/${userId}-${Date.now()}-${filename}`

    const upload = await new AWS.S3().upload({
        Bucket: "instaclone-uploads-luke",
        Key: ObjName,
        ACL: "public-read",
        Body: readStream
    }).promise()
    return upload.Location
}   