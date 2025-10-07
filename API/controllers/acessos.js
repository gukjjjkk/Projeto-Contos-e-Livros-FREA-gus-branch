import { db } from "../db.js";


export const registrarAcesso = async (req,res)=>{
    const {idUsuario, idObra} = req.body;

    if (!idUsuario|| !idObra){
        return res.status(400).json({error:"Preencha todos os campos"});
    }

    try{
        await db.query(
            "INSERT INTO historico_acessos (idUsuario, idObra) VALUES (?,?)",[idUsuario, idObra]
        );

        await db.query(
            "UPDATE obras SET contadorAcessos=contadorAcessos + 1 WHERE idObra=?",[idObra]
        );

        res.status(200).json({message:"Acesso Registrado !!"})

    }catch(error){
        console.err("Erro ao registrar o acesso",error);
        res.status(500).json({error:"Erro ao registrar o acesso"});
    }

}