import express from "express";
import { criarUsuario } from "../controllers/usuario.js";

const router = express.Router();

router.post("/",criarUsuario);

export default router;