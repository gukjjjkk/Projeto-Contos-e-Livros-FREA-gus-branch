import express from "express";
import { criarPalavraChave } from "../controllers/palavras-chave.js";

const router= express.Router();

router.post("/",criarPalavraChave);

export default router;
