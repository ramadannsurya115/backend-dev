import express from "express"
import { getregister, registerdata } from "../controllers/registercontroler.js"


const router = express.Router()

router.post('/',getregister)
router.get('/',registerdata)


export default router