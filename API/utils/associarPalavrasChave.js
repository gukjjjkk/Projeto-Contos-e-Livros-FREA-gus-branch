import { db } from "../db.js";
import { criarPalavraChaveAux } from "../controllers/palavras-chave.js";

export const associarPalavrasChave = async (idObra, palavrasChave) => {
  for (const palavra of palavrasChave) {
    let [palavraChave] = await db.query(
      "SELECT idPalavraChave FROM palavras_chave WHERE descritivoPalavraChave = ?",
      [palavra]
    );

    if (!palavraChave.length) {
      await criarPalavraChaveAux(palavra);
      [palavraChave] = await db.query(
        "SELECT idPalavraChave FROM palavras_chave WHERE descritivoPalavraChave = ?",
        [palavra]
      );
    }

    const idPalavraChave = palavraChave[0].idPalavraChave;

    await db.query(
      "INSERT INTO obra_palavrachave_assoc (idObra, idPalavraChave) VALUES (?, ?)",
      [idObra, idPalavraChave]
    );
  }
};
