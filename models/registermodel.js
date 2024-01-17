import {PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient()

export const modelregister =async({body})=>{
const {username,email,password} = body

if(!username || !email || !password){
    throw new Error("data yang anda masukan tidak lengkap")
}

const userunique = await prisma.user.findUnique({
    where:{
        email : email
    }
}) 

if(userunique){
    throw new Error("user yang anda masukan sudah terdaftar")
}

    

    try {
        const hashedpassword = await bcrypt.hash(password,10)
        const res = await prisma.user.create({
            data :{
                nama : username,
                email : email,
                password : hashedpassword
            }
        })
        return res;
    } catch (error) {
        console.log(error)
        
    }
}

export const getRegisterdata = async ()=>{
    try {
        const res = await prisma.user.findMany();
        return res;
        
    } catch (error) {
        console.log(error)
        
    }

}