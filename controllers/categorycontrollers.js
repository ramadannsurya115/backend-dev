import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const getcategory = async (req,res)=>{
    const limit = Number(req.query.limit) || 4
    const id = Number(req.query.id) || ""

    
    try {
        const data = await prisma.product.findMany({
            where:{
            category : req.params.category,    

                
            },
            take : limit
        })
        res.status(200).json({data})
    } catch (error) {
        res.status(404).json({msg:"gagal fetching data"})
    }


}