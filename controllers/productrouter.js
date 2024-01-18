import {getproductmodelbyid} from "../models/productmodel.js"
import { PrismaClient } from "@prisma/client"
import path from 'path'
import fs from "fs"
const prisma = new PrismaClient()

export const getproduct = async(req,res)=>{
    const search = req.query.search || "" ;
    const page =   Number(req.query.page)   || 0  ;
    const limit =  Number(req.query.limit)  || 10 ;
    const ofset  = Math.ceil(page*limit)
    const totalrow = await prisma.product.count({
        where :{
            namaproduct : {
                contains : search
            }
        }
        
    })
    
    const totalpage = Math.ceil(totalrow/limit)
    const result = await prisma.product.findMany({
        where :{
            namaproduct :{
                contains : search
            }
        },
        skip : ofset,
        take : Number(limit),
        orderBy :{
            id : "asc"
        }
    })

    res.status(200).json({
        data :result, 
        page : page,
        totalpage : totalpage,
        totalrow: totalrow,
        limit : limit,
        ofset :ofset


    })

 
}

export const getproductbyid = async(req,res)=>{
    const {id} = req.params;
    const data = await getproductmodelbyid({id}).then((data)=>{
        res.status(200).json({msg : "Data berhasil ditangkap",data})
    }).catch((err)=>{
        res.status(400).json({
            msg: err.message
        })
    })

}

export const postproduct = async (req,res)=>{

    const {namaproduct,category,hargaawal,diskon,
    hargatotal,stok,description} = req.body;

    const file = req.files.file;
    const filesize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext;
    const url = `/https://apistore.cyclic.app/images/${fileName}`
    const allowType = ['.png','.jpg','.jpeg']

    if(!namaproduct || !category || !hargaawal 
        || !diskon || !hargatotal  || !stok || !description || !file ) res.status(404).json({msg : "Data yang anda masukan tidak lengkap"})
    if(!allowType.includes(ext.toLowerCase())) res.status(400).json({msg:"type yang anda masukan salah"})
    if(filesize > 5000000) res.status(400).json({msg : "file tidak harus dibawah 5 mb"})


        
        try {
            const result = await prisma.product.create({
                data :{
                        namaproduct : namaproduct,
                        category :category,
                        hargaawal : Number(hargaawal),
                        diskon : Number(diskon),
                        hargatotal : Number(hargatotal),
                        image : fileName,
                        url : url,
                        stok : Number(stok),
                        description :description

                }
            })
            
            res.status(201).json({msg:"data berhasil ditambahkan",result})
        } catch (error) {
            console.log(error)
    }
}


 export const updateproduct = async(req,res)=>{
    

    const product = await prisma.product.findFirst({
        where:{
            id : req.params.id
        }
    })


    let fileName =""
    if(req.files === null){
        fileName = product.image
    }else{
        const file = req.files.file;
        const filesize = file.data.length
        const ext = path.extname(file.name)
        fileName = file.md5 + ext;
        const allowType = ['.png','.jpg','.jpeg']
        
        if(!allowType.includes(ext.toLowerCase())) res.status(400).json({msg:"type yang anda masukan salah"})
        if(filesize > 5000000) res.status(400).json({msg : "file tidak harus dibawah 5 mb"})
       
    
    
    const url = `/https://apistore.cyclic.app/images/${fileName}`
    const {namaproduct,category,hargaawal,diskon,
        hargatotal,stok,description} = req.body;
       
    try {
        const result = await prisma.product.update({
            where :{
                    id : req.params.id
            },
            data :{
                    namaproduct : namaproduct,
                    category :category,
                    hargaawal : Number(hargaawal),
                    diskon : Number(diskon),
                    hargatotal : Number(hargatotal),
                    image : fileName,
                    url : url,
                    stok : Number(stok),
                    description :description
                    
                }
            })
            
       
            
            res.status(201).json({msg:"data berhasil diupdate",result})
    } catch (error) {
        console.log(error)
}


    }
 }

 export const deleteproduct = async(req,res)=>{

    const product = await prisma.product.findFirst({
        where :{
            id : req.params.id
        }
    })
        if(!product) return res.status(400).json({msg: "product tidak ditemukan"})

    const data = await prisma.product.delete({
        where :{
            id : req.params.id
        }
    }).then((data)=>{
        res.status(200).json({msg : "Data berhasil dihapus"})
    }).catch((err)=>{
        console.log(err)
    })
 }