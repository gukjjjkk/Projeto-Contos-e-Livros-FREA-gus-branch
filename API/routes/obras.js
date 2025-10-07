import express from "express"

import { criarObra } from "../controllers/obras.js"

const router = express.Router()

router.post("/",criarObra)

export default router;
