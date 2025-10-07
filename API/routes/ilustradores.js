import express from "express"
import { criarIlustrador } from "../controllers/ilustradores.js";

const router = express.Router();


router.post("/",criarIlustrador);

export default router;

