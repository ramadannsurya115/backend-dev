import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const getdiskon = async (req,res)=>{
    const limit = Number(req.query.limit) || 5

    try {
            const result = await prisma.product.findMany({
                where :{
                    diskon : {
                        gte : 1000
                    }
                    
                },
                take : limit
            })

    res.status(200).json({result})
    } catch (error) {
        res.status(404).json({msg : "gagal fetching data"})
    }
}