import React, { useEffect, useState } from "react";
import api from "./api";
import "./App.css";

const PagLivros = () => {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
  const res = await api.get("obras?tipoObra=Livro");
        setLivros(res.data);
      } catch (err) {
        setError("Erro ao buscar livros.");
      } finally {
        setLoading(false);
      }
    };
    fetchLivros();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="form-cadastro error">{error}</div>;

  return (
    
    <div className="galeria-imagens">
        <h2>Livros</h2>
      {livros.length === 0 ? (
        <p>Nenhum livro cadastrado.</p>
      ) : (
        livros.map((livro) => (
          <div className="imagem-item" key={livro.idObra}>
            <img src={livro.caminhoImagemObra || "/imagens/default.jpg"} alt={livro.tituloObra} />
            <p>{livro.tituloObra}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PagLivros;
