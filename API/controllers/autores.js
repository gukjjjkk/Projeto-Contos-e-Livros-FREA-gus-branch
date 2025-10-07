import { db } from "../db.js";

// Função auxiliar para uso interno
export const criarAutorAux = async (nomeAutor, caminhoImagemAutor, formacaoAutor, trabalhoAtualAutor) => {
  await db.query(
    "INSERT INTO autores (nomeAutor, caminhoImagemAutor, formacaoAutor, trabalhoAtualAutor) VALUES (?, ?, ?, ?)",
    [nomeAutor, caminhoImagemAutor, formacaoAutor, trabalhoAtualAutor]
  );
};

export const criarAutor = async (req, res) => { //Função de Cadastro de Autor
  const {  nomeAutor, caminhoImagemAutor , formacaoAutor , trabalhoAtualAutor } = req.body;
  const query = "INSERT INTO autores ( nomeAutor, caminhoImagemAutor , formacaoAutor , trabalhoAtualAutor) VALUES (?, ?, ?, ?)";

  try {
    const [data] = await db.query(query, [ nomeAutor, caminhoImagemAutor , formacaoAutor , trabalhoAtualAutor]);
    return res.status(201).json({ mensagem: "Autor cadastrado com sucesso!", id: data.insertId });
  } catch (err) {
    return res.status(500).json(err);
  }
}