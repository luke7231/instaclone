import client from '../client'

export default {
    Query: {
        seeFollowers: async(_, { userName, page }) => {
            const ok = client.user.findFirst({ where: { userName } , select:{id:true}})//select = 선택적으로 받아오기
            if (!ok) {
                return {
                    ok: false,
                    error: " user not found"
                }
            }
            //const totalPages = await client.user.count({where:})
            const followers = await client.user.findUnique({ where: { userName } }).followers({
                skip: (page-1) *1,
                take: 1
            })
            const totalPages = await client.user.count({
                where: {
                    followings:
                    {
                        some: {
                            userName
                        }
                    }
                }
            }) 
            //console.log(totalPages)
            return {
                ok: true,
                followers,
                totalPages : Math.ceil(totalPages/2),// 수정하기
            }
            
            
        }
    }
}