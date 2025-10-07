import { db } from "../db.js";


export const favoritarObra = async (req,res)=>{
    const {idUsuario,idObra}=req.body;

    if (!idUsuario|| !idObra){
        return res.status(400).json({error:"Preencha todos os campos"});
    }

    try{
        db.query("INSERT INTO minha_lista (idUsuario,idObra) VALUES (?,?)")
    }catch(error){
        console.err("Erro ao inserir obra favorita",error)
        res.status(500).json({error:"Erro ao inserir obra favorita"});
    }
}