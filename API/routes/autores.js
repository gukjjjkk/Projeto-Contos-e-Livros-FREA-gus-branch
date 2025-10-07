import express from "express";

import { criarAutor } from "../controllers/autores.js";

const router = express.Router();

//Rota POST para criar autor
router.post("/", criarAutor);

export default router;