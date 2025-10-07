import express from "express"
import {getObrasMaisAcessadas } from "../controllers/ObrasAcessadas.js"
import { criarObra } from "../controllers/obras.js"

const router = express.Router();

router.post("/", criarObra);
router.get("/mais-acessados", getObrasMaisAcessadas);

export default router;

