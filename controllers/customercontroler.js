import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getcustomer = async (req,res)=>{
    
    
try {
    const totalrow = await prisma.customer.count();
    const data = await prisma.customer.findMany()

    res.status(200).json({msg:"data berhasil diambil",
                          data : data,
                          totalrow : totalrow                          
})
    
} catch (error) {
    res.status(400).json({msg:"gagal fetching data"})
}
}

export const postCustomer = async(req,res)=>{
    const {namadepan,namabelakang,nomor,email,pos,alamat,kota} = req.body
    try {
        const data = await prisma.customer.create({
            data :{
                namadepan : namadepan,
                namabelakang :namabelakang,
                nomor : Number(nomor),
                email : email,
                pos : pos,
                kota : kota,
                alamat : alamat
            }
        })

        res.status(201).json({msg:"data berhasil dikirim"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}