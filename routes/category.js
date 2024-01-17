import express from "express"
import { getcategory } from "../controllers/categorycontrollers.js"

const router = express.Router()


router.get('/:category',getcategory)


export default router;