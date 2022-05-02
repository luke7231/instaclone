import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import client from "../../client"

export default {
    Mutation: {
        login: async (_, { userName, password }) => {
            //1. find user with arg userName
            const user = await client.user.findFirst({
                where: {
                    userName,
                }
            })
            if (!user) {
                return {
                    ok: false,
                    error: "User not found"
                }
            }
            //2. check password with args.password
            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "Incorrect Password"
                }
            }
            const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            }

            //3. 토큰 발행 ㅅ후 유저한테 보내준다
        }
    },
    
}