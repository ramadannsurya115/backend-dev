import express from "express"
import { getcustomer, postCustomer } from "../controllers/customercontroler.js";

const router = express.Router()

router.get('/',getcustomer)
router.post('/',postCustomer)

export default router ;