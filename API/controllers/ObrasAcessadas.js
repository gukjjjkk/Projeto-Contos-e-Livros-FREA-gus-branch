import { db } from "../db.js";


export const getObrasMaisAcessadas = async (req, res) => {
  const limite = parseInt(req.query.limite) || 10; // padrão: 10

  try {
    const [result] = await db.query("CALL GetObrasMaisAcessadas(?)", [limite]);
    // O resultado de uma procedure vem como array de arrays
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar livros mais acessados.", detalhe: error.message });
  }
};

















