import express from "express"
import cors from "cors"
import registerRouter from "./routes/register.js"
import loginrouter from "./routes/login.js"
import productrouter from "./routes/product.js"
import diskonrouter from './routes/diskon.js'
import fileUpload from "express-fileupload"
import categoryrouter from "./routes/category.js"
import customerRouter from "./routes/customer.js"
import tranksasiRouter from "./routes/transaksi.js"
const app = express();
const port = 5000;
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static('public'))
app.use('/register',registerRouter)
app.use('/login',loginrouter)
app.use('/product',productrouter)
app.use('/diskon',diskonrouter)
app.use('/category',categoryrouter)
app.use('/customer',customerRouter)
app.use('/transaksi',tranksasiRouter)
app.listen(port,()=>{
    console.log(`server app and running in port ${port}`)
})