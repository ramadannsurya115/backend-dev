import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()



export const getproductmodelbyid = async({id})=>{
    
    try {
        const result = await prisma.product.findFirst({
            where :{
                    id : id
            }
        })      
        return result
    } catch (error) {

        console.log(error)
    }
}
