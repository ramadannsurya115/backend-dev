import express from "express"
import { gettransaksi, saveTransaksi } from "../controllers/transaksicontroller.js"

const router = express.Router()

router.get('/',gettransaksi)
router.post('/',saveTransaksi)

export default router;