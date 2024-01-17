import { sendlogin } from "../models/loginmodel.js"


export const login = async (req,res)=>{
    const {body} = req
    const result = await sendlogin({body}).then((token)=>{
        res.status(200).json({token})
    }).catch((error)=>{
        res.status(404).json({msg : error.message})
    })
    
    
}