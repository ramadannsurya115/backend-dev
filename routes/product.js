import express from "express"
import { deleteproduct, getproduct, getproductbyid, postproduct, updateproduct } from "../controllers/productrouter.js";


const router = express.Router()

router.get('/',getproduct)
router.get('/:id',getproductbyid)

router.post('/',postproduct)
router.patch('/:id',updateproduct)
router.delete('/:id',deleteproduct)


export default router;