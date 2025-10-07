import express from "express";
import { favoritarObra } from "../controllers/favoritos.js";

const router = express.Router();

router.post("/",favoritarObra);

export default router;