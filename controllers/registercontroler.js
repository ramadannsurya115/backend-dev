import { PrismaClient } from "@prisma/client";
import { getRegisterdata, modelregister } from "../models/registermodel.js";
const prisma = new PrismaClient()

export const getregister = async(req,res)=>{
    const {body} = req
        const data = await modelregister({body}).then((data)=>{
            res.status(201).json({msg:"data berhasil difetching",data})

        }).catch((error)=>{
            res.status(400).json({msg:error.message})
        })
        
        
    
}

export const registerdata = async (req,res)=>{
    try {
        const result = await getRegisterdata()
        res.status(200).json(result)
        
    } catch (error) {
        console.log(error)
    }
}