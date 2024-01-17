import express from "express"
import { savepayment } from "../controllers/paymentcontroller.js";

const router = express.Router();

router.post('/',savepayment)

export default router;