import express from "express";
import { criarEditora } from "../controllers/editora.js";

const router =express.Router();

router.post("/",criarEditora)

export default router;

