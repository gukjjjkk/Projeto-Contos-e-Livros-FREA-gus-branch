import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EdicaoObra({ obra }) {
  const [dadosObra, setDadosObra] = useState(obra);
  const navigate = useNavigate();

  // Atualiza campos da obra
  const handleChange = (e) => {
    setDadosObra({ ...dadosObra, [e.target.name]: e.target.value });
  };

  // Edita obra (PUT)
  const editarObra = async () => {
    try {
      await axios.put(`/api/Obras/${dadosObra.id}`, dadosObra);
      alert("Obra atualizada com sucesso!");
      navigate("/"); // Redireciona após edição
    } catch (error) {
      alert("Erro ao editar obra: " + error.response?.data?.message || error.message);
    }
  };

  // Exclui obra (DELETE)
  const excluirObra = async () => {
    if (window.confirm("Tem certeza que deseja excluir esta obra?")) {
      try {
        await axios.delete(`/api/Obras/${dadosObra.id}`);
        alert("Obra excluída com sucesso!");
        navigate("/"); // Redireciona após exclusão
      } catch (error) {
        alert("Erro ao excluir obra: " + error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div>
      <h2>Editar Obra</h2>
      <form onSubmit={e => { e.preventDefault(); editarObra(); }}>
        <input name="titulo" value={dadosObra.titulo} onChange={handleChange} placeholder="Título" />
        <input name="autor" value={dadosObra.autor} onChange={handleChange} placeholder="Autor" />
        {/* Adicione outros campos conforme necessário */}
        <button type="submit">Salvar Alterações</button>
      </form>
      <button onClick={excluirObra} style={{ color: "red" }}>Excluir Obra</button>
    </div>
  );
}

export default EdicaoObra;

exports.editarObra = async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    autor,
    editora,
    ilustrador,
    ano,
    imagem,
    palavrasChave
  } = req.body;

  try {
    // Verifica e cria entidades relacionadas se necessário (padrão do projeto)
    // Exemplo para autor:
    let [autorRows] = await db.query('SELECT id FROM autores WHERE nome = ?', [autor]);
    let autorId = autorRows[0]?.id;
    if (!autorId) {
      const [result] = await db.query('INSERT INTO autores (nome) VALUES (?)', [autor]);
      autorId = result.insertId;
    }
    // Repita para editora e ilustrador...

    // Atualiza a obra
    await db.query(
      `UPDATE obras SET titulo=?, autor_id=?, editora_id=?, ilustrador_id=?, ano=?, imagem=? WHERE id=?`,
      [
        titulo,
        autorId,
        /* editoraId */,
        /* ilustradorId */,
        ano,
        imagem || '/imagens/default.jpg',
        id
      ]
    );

    // Atualiza palavras-chave (utilize função utilitária se houver)
    // await associarPalavrasChave(id, palavrasChave);

    res.status(200).json({ message: 'Obra atualizada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar obra.', details: error.message });
  }
};














































