import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const sendlogin = async({body})=>{
    
    const {username,email,password} = body
    
    if(!email || !username || !password){
    throw new Error("data yang anda masukan tidak lengkap")  }

    const user = await prisma.user.findUnique({
        where :{
            email : email
        }
    })

       

        if(!user?.email){
            throw new Error("email yang anda masukan salah")
        }

        if(user.nama !== username){
            throw new Error("username salah")
        }

        const passwordmatched = await bcrypt.compare(password,user.password)
        
        if(!passwordmatched){
            throw new Error("password anda salah")
        }

        const payload = {
            id    :user.id,
            email :user.email,
            username : user.nama
        }
        const secret = process.env.JWT_SECRET
        const expireIn = '1h';

        const token = jwt.sign(payload,secret,{expiresIn : expireIn})
        
        return token

}
