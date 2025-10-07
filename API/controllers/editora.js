import { db } from "../db.js";

// Função auxiliar para uso interno
export const criarEditoraAux = async (nomeEditora,  cidadeEditora = null) => {
  await db.query("INSERT INTO editoras (nomeEditora,  cidadeEditora) VALUES (?, ?)", [nomeEditora,  cidadeEditora]);
};

export const criarEditora = async (req, res) => {
 const { nomeEditora,  cidadeEditora} = req.body;

  const q = "INSERT INTO editoras (nomeEditora,  cidadeEditora) VALUES (?, ?)";


  await db.query(q, [nomeEditora,  cidadeEditora], (err, data) => {
    if (err) return res.status(500).json({ erro: err });
    return res.status(201).json({ mensagem: "Editora cadastrada com sucesso!", id: data.insertId });
  }); 
};