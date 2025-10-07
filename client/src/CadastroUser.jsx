import { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

function CadastroUser() {
  const [formData, setFormData] = useState({
    nomeUsuario: "",
    emailUsuario: "",
    senhaHash: "",
    caminhoImagemUsuario:"",
    descricaoUsuario: "",
    provedorAuth:"",
    provedorAuthId:"",
    funcaoUsuario: "",
    dataCriacao: "",
  });
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adiciona data de criação
      const dados = { ...formData, dataCriacao: new Date().toISOString() };
  await api.post("Usuarios", dados);
      setMensagem("Usuário cadastrado com sucesso!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMensagem("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div id="Login" style={{ padding: "20px" }}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nomeUsuario"
          placeholder="Nome do Usuário"
          value={formData.nomeUsuario}
          onChange={handleChange}
          required
        />
        <select
          name="funcaoUsuario"
          value={formData.funcaoUsuario}
          onChange={handleChange}
          required
        >
          <option value="usuario">Usuário</option>
          <option value="administrador">Administrador</option>
          <option value="alimentador">Alimentador</option>
        </select>
        <input
          name="emailUsuario"
          type="email"
          placeholder="Email do Usuário"
          value={formData.emailUsuario}
          onChange={handleChange}
          required
        />
        <input
          name="senhaHash"
          type="password"
          placeholder="Senha do Usuário"
          value={formData.senhaHash}
          onChange={handleChange}
          required
        />
        <textarea
          name="descricaoUsuario"
          placeholder="Descrição do Usuário"
          value={formData.descricaoUsuario}
          onChange={handleChange}
        />
        <input
          name="caminhoImagemUsuario"
          
          placeholder="Imagem do Usuário"
          value={formData.caminhoImagemUsuario}
          onChange={handleChange}
          required
        />
        <input
          name=" dataCriacao"
          type="date"
          placeholder="Data de Criação"
          value={formData.dataCriacao}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default CadastroUser;