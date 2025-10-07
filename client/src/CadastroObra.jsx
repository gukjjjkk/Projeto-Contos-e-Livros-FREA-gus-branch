import { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
//Função de Cadastro de Obras
function CadastroObra() {
  const [formData, setFormData] = useState({
    tituloObra: "",
    tipoObra: "Livro",
    resumoObra: "",
    relatorioObra:"",
    dataPublicacao: "",
    caminhoImagemObra: "",
    nomeAutor: "",
    formacaoAutor: "", 
    trabalhoAtualAutor: "", 
    caminhoImagemAutor: "",
    nomeilustrador: "",
    nomeEditora: "",
    cidadeEditora: "",
    palavrasChave: "",
    contadorAcessos:"" 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const dados = {
    ...formData,
    palavrasChave: formData.palavrasChave
      .split(",")
      .map(p => p.trim())
      .filter(p => p.length > 0)
  };

  console.log("📦 Dados enviados ao backend:", dados); // Veja no console

  try {
  await api.post("obras", dados);
    alert("Obra cadastrada com sucesso!");
    navigate("/"); // Volta para a home
  } catch (error) {
    console.error("❌ Erro no cadastro:", error);
    if (error.response) {
      console.log("📨 Resposta do backend:", error.response.data); // <-- ESSENCIAL!
    }
    alert("Erro ao cadastrar obra.");
  }
};


  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastro de Obra</h2>
      <form onSubmit={handleSubmit}>
        <input name="tituloObra" placeholder="Título da Obra" value={formData.tituloObra} onChange={handleChange} required />
        
        <select name="tipoObra" value={formData.tipoObra} onChange={handleChange}>
          <option value="Livro">Livro</option>
          <option value="Conto">Conto</option>
        </select>
        
        <textarea name="resumoObra" placeholder="Resumo" value={formData.resumoObra} onChange={handleChange} />
        <textarea name="relatorioObra" placeholder="Relatório" value={formData.relatorioObra} onChange={handleChange} />
        
        <input name="dataPublicacao" type="date" value={formData.dataPublicacao} onChange={handleChange} />
        
        <input name="caminhoImagemObra" placeholder="Caminho da Imagem" value={formData.caminhoImagemObra} onChange={handleChange} />
        
        <input name="nomeAutor" placeholder="Nome do Autor" value={formData.nomeAutor} onChange={handleChange} required />
        <input name="formacaoAutor" placeholder="Formação do Autor" value={formData.formacaoAutor} onChange={handleChange} />
        
        <input name="trabalhoAtualAutor" placeholder="Trabalho Atual do Autor" value={formData.trabalhoAtualAutor} onChange={handleChange} />
        <input name="caminhoImagemAutor" placeholder="Caminho da Imagem do Autor" value={formData.caminhoImagemAutor} onChange={handleChange} />
        
        <input name="nomeilustrador" placeholder="Nome do Ilustrador" value={formData.nomeilustrador} onChange={handleChange} />
                
        <input name="nomeEditora" placeholder="Nome da Editora" value={formData.nomeEditora} onChange={handleChange} />
        
        <input name="cidadeEditora" placeholder="Cidade da Editora" value={formData.cidadeEditora} onChange={handleChange} />
        
        <input name="palavrasChave" placeholder="Palavras-chave separadas por vírgula" value={formData.palavrasChave} onChange={handleChange} />
        <input name="contadorAcessos" placeholder="contadorAcessos" value={formData.contadorAcessos} onChange={handleChange} />

        
        

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroObra;