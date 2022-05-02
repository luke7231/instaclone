import client from '../../client';
import bcrypt from 'bcrypt'

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            userName,
            email,
            password
        }) => {
            try {
                const existingUser = await client.user.findFirst({ // i need to be able to use await ! 꼭 기억하기. 
                    where: { // this is filter like
                        OR: [ // there are more thing ex(AND,NOT ) //객체들의 배열 형태로 작성
                            {
                                userName,
                            },
                            {
                                email,
                            }
                        ]
                    }
                });
                if (existingUser) {
                    throw new Error("Already existed❌")
                }
                // 2.hash password
                const uglyPassword = await bcrypt.hash(password, 10)
                // 3.save and return the user
                await client.user.create({
                    data: {
                        firstName: firstName,
                        lastName,
                        userName,
                        email,
                        password: uglyPassword
                    }
                })
                return {
                    ok: true,
                    error: null,
                }
            } catch (e) {
                return e
            }
        
            
        },
    }
}