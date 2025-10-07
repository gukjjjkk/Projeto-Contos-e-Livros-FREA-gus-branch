import { db } from "../db.js";

// Função auxiliar para uso interno
export const criarIlustradorAux = async (nomeilustrador ) => {
  await db.query("INSERT INTO ilustradores (nomeIlustrador ) VALUES (?)", [nomeilustrador ]);
};


export const criarIlustrador =async (req, res) => {
  const { nomeilustrador  } = req.body;

  const q = "INSERT INTO ilustradores ( nomeilustrador ) VALUES (?)";

 await db.query(q, [nomeilustrador ], (err, result) => {
    if (err) return res.status(500).json(err);

    res.status(201).json({
      mensagem: "Ilustrador cadastrado com sucesso!",
      id: result.insertId,
    });
  });
};
