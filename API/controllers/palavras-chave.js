import {db} from "../db.js"

// Função auxiliar para uso interno
export const criarPalavraChaveAux = async (descritivoPalavraChave ) => {
  await db.query("INSERT INTO palavras_chave (descritivoPalavraChave ) VALUES (?)", [descritivoPalavraChave ]);
};


export const criarPalavraChave = async (req,res) =>{
    const {descritivoPalavraChave } =req.body;

    const q = "INSERT INTO palavras_chave (descritivoPalavraChave ) VALUES (?)";

   await db.query(q, [descritivoPalavraChave], (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({
      mensagem: "Palavra Chave cadastrada com sucesso!",
      id: result.insertId,
    });
  });

    
}