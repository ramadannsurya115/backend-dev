import jwt from "jsonwebtoken"

const jwtvalidate = async(req,res,next)=>{
    const {authorization} = req.headers;

    if(!authorization){
        res.status(401).json({
            msg : "token tidak ada"
        })
    }
    const secret = process.env.JWT_SECRET
    const token = authorization.split(' ')[1]
    
    try {
    const jwtDecode = jwt.verify(token,secret)
    req.userData = jwtDecode;
    
    } catch (error) {
        return res.status(401).json({
            msg : "gagal validasi jwt"
        })
        
    }
    next()
}