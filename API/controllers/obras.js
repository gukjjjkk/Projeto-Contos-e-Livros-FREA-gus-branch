import { db } from "../db.js";
import { criarAutorAux } from "./autores.js";
import { criarEditoraAux } from "./editora.js";
import { criarIlustradorAux } from "./ilustradores.js";
import {associarPalavrasChave} from "../utils/associarPalavrasChave.js"

// Função responsável por criar uma nova obra no banco de dados
export const criarObra = async (req, res) => {
  // Log do corpo da requisição para depuração
  console.log("REQ.BODY:", req.body);

  // Desestruturação dos dados recebidos na requisição
    const {
      tituloObra,
      tipoObra,
      resumoObra,
      dataPublicacao,
      relatorioObra,
      caminhoImagemObra,
      nomeAutor,
      caminhoImagemAutor,
      formacaoAutor,
      trabalhoAtualAutor,
      nomeilustrador,
      nomeEditora,
      cidadeEditora,
      palavrasChave,
      contadorAcessos
    } = req.body;
 
  try {
    // ========================
    // Processamento do Autor
    // ========================
    // Busca autor pelo nome e demais atributos
    let [autor] = await db.query(
      "SELECT idAutor FROM autores WHERE nomeAutor = ? AND caminhoImagemAutor = ? AND formacaoAutor = ? AND trabalhoAtualAutor = ?",
      [nomeAutor, caminhoImagemAutor, formacaoAutor, trabalhoAtualAutor]
    );

    // Se não existir, cria o autor
    if (!autor.length) {
      await criarAutorAux(nomeAutor, caminhoImagemAutor, formacaoAutor, trabalhoAtualAutor);

      // Busca novamente após criação
      [autor] = await db.query(
        "SELECT idAutor FROM autores WHERE nomeAutor = ? AND caminhoImagemAutor = ? AND formacaoAutor = ? AND trabalhoAtualAutor = ?",
        [nomeAutor, caminhoImagemAutor, formacaoAutor, trabalhoAtualAutor]
      );
    }

    // Se ainda não encontrar, retorna erro
    if (!autor.length) {
      return res.status(400).json({ error: "Não foi possível criar o autor." });
    }

    const idAutor = autor[0].idAutor;

    // ========================
    // Processamento do Ilustrador
    // ========================
    // Busca ilustrador pelo nome
  let [ilustrador] = await db.query("SELECT idilustrador FROM ilustradores WHERE nomeilustrador = ?", [nomeilustrador]);
    // Se não existir, cria o ilustrador
    if (!ilustrador.length) {
      await criarIlustradorAux(nomeilustrador);
      [ilustrador] = await db.query("SELECT idilustrador FROM ilustradores WHERE nomeilustrador = ?", [nomeilustrador]);
    }
    const idilustrador = ilustrador[0].idilustrador;

    // ========================
    // Processamento da Editora
    // ========================
    // Busca editora pelo nome e cidade
    let [editora] = await db.query(
      "SELECT idEditora FROM editoras WHERE nomeEditora = ? AND cidadeEditora = ?",
      [nomeEditora, cidadeEditora]
    );
    // Se não existir, cria a editora
    if (!editora.length) {
      await criarEditoraAux(nomeEditora, cidadeEditora);
      [editora] = await db.query(
        "SELECT idEditora FROM editoras WHERE nomeEditora = ? AND cidadeEditora = ?",
        [nomeEditora, cidadeEditora]
      );
    }
    const idEditora = editora[0].idEditora;

    // ========================
    // Verificação de obra existente
    // ========================
    let [obraExistente] = await db.query(
      "SELECT * FROM obras WHERE tituloObra = ? AND idAutor = ? AND idilustrador = ? AND idEditora = ?",
      [tituloObra, idAutor, idilustrador, idEditora]
    );
    // Se já existir, retorna erro de conflito
    if (obraExistente.length) {
      return res.status(409).json({ error: "Obra já cadastrada." });
    }

    // ========================
    // Cadastro da obra
    // ========================
    // Define imagem padrão caso não seja informada
    const imagem = caminhoImagemObra || "/imagens/default.jpg";

    // Insere obra no banco de dados
    const [result] = await db.query(
      `INSERT INTO obras 
      (tituloObra, tipoObra, resumoObra, relatorioObra, dataPublicacao, caminhoImagemObra, contadorAcessos, idAutor, idilustrador, idEditora) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

      [
        tituloObra,
        tipoObra,                  // Ex: "Livro" ou "Conto"
        resumoObra || null,        // Pode ser null
        relatorioObra || null,     // Pode ser null
        dataPublicacao || null,    // Formato: 'YYYY-MM-DD'
        imagem,                    // Caminho da imagem ou padrão
        contadorAcessos || 0,      // Valor padrão 0 se não informado
        idAutor,
        idilustrador,
        idEditora
      ]
    );
    const idObra = result.insertId;

    // ========================
    // Associação de palavras-chave à obra
    // ========================
    if (palavrasChave && Array.isArray(palavrasChave)) {
      await associarPalavrasChave(idObra, palavrasChave);
    }

    // Retorna sucesso
    res.status(201).json({ message: "Obra cadastrada com sucesso!" });
  } catch (error) {
    // Log de erro e retorno de mensagem amigável
    console.error("Erro ao cadastrar obra:", error);
    res.status(500).json({ error: "Erro ao cadastrar obra.", detalhe: error.message });
  }
};











