import express from "express";
import { registrarAcesso } from "../controllers/acessos.js";

const router =express.Router();

router.post("/",registrarAcesso);

export default router;