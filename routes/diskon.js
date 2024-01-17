import express  from "express";
import { getdiskon } from "../controllers/diskoncontroller.js";

const router = express.Router()

router.get('/',getdiskon)

export default router;