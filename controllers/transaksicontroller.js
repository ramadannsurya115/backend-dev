import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


export const gettransaksi = async(req,res)=>{
    const totalrow = await prisma.transaksi.count()
    const data = await prisma.transaksi.findMany({
        select :{
            id : true,
            customer :{
                select :{
                    namadepan : true,
                    kota : true,
                    alamat : true,
                    pos :true,
                    email : true,
                    nomor :true
                }
            },
            product :{
                select :{
                    namaproduct : true,
                    hargatotal : true,
                    category : true,
                    url : true
                }
            },
            quantity : true
        }
    })
    try {
        res.status(200).json({msg:"data berhasil difetching",
                             data : data,
                             totalrow : totalrow
                            })
    
    } catch (error) {
        res.status(400).json({msg : error.message})
    }

}

export const saveTransaksi = async(req,res)=>{
    const {id,price,name,quantity,namadepan,namabelakang,nomor,email,alamat,pos,kota} = req.body
    const customer = await prisma.transaksi.findUnique({
         select :{
            where :{
            customer :{
              email : email
                
            }
         }
        }
    })

    if(customer){
        res.status(403).json({msg:"email sudah terdaftar"})
    }
    const data = await prisma.transaksi.create({
        data :{
               customer :{
                create :{
                    namadepan : namadepan,
                    namabelakang : namabelakang,
                    nomor : Number(nomor) ,
                    email: email,
                    alamat: alamat,
                    kota : kota,
                    pos : pos

                }
                
               }  ,
               product :{
                connect :{
                    id : id
                }
               },
               quantity : quantity           
        }
    })
    
    try {
        res.status(201).json({msg:"Data berhasil disimpan",data})
    } catch (error) {
        res.status(400).json({msg : error.message})
    }
}