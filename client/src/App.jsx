import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CadastroObra from "./CadastroObra";
import PalavraChave from "./components/PalavrasChave"; 
import MinhaLista from "./components/MinhaLista";
import CadastroUser from "./CadastroUser";
import LoginUser from "./LoginUser";
import PagLivros from "./PagLivros";




function App() {
  return (
    <Router>
      <div id="root">
        <header>
          <button id="logoo">Logo</button>
          <ul id="menu">
            <li><Link to="/"><button>Início</button></Link></li>
            <li><Link to="/palavras-chave"><button>Palavras-Chave</button></Link></li>
            <li><Link to="/livros"><button>Livros</button></Link></li>
            <li><Link to="/contos"><button>Contos</button></Link></li>
            <li><Link to="/Minha Lista"><button>Minha Lista</button></Link></li>
            <li><Link to="/cadastro"><button>Controle de Obras</button></Link></li>
            
            <li><Link to="/LoginUser"><button>Teste LoginUser</button></Link></li>
          
            
          </ul>
          <div className="search-bar">
            <input type="text" placeholder="Buscar..." />
            <button>Buscar</button>
           <div>
             <li><Link to="/Perfil"><button>Perfil</button></Link></li>
           </div>
            
          </div>
          
        </header>

        {/* Rotas principais */}
        <Routes>
          <Route path="/" element={<Início />} />
          <Route path="/cadastro" element={<CadastroObra />} />
          <Route path="/palavras-chave" element={<PalavraChave />} />
          <Route path="/Obras" element={<PagLivros />} />
          <Route path="/Minha Lista" element={<MinhaLista />} />
          <Route path="/Perfil" element={<CadastroUser />} />
          <Route path="/LoginUser" element={<LoginUser />} />

          
          </Routes> 
          
                <footer>
          <p>Todos os direitos reservados © 2025</p>
        </footer>
      </div>
    </Router>
  );
}

function Início() {
  return (
    <>
      <div className="titulo">
        <h1>Seja Bem Vindo á Bibliografia de Livros Infantojuvenis em Lingua Portuguesa</h1>
        <h6>Centenas de contos e livros das mais variadas áreas do conhecimento</h6> 
      </div>

      <p>Obras mais Acessadas</p>

      <div className="galeria-imagens">
        <div className="imagem-item">
          <img src="/imagens/livro1.jpg" alt="Livro 1" />
          <p id="livro1">Livro 1</p>
        </div>
        <div className="imagem-item">
          <img src="/imagens/livro2.jpg" alt="Livro 2" />
          <p id="livro2">Livro 2</p>
        </div>
        <div className="imagem-item">
          <img src="/imagens/livro3.jpg" alt="Livro 3" />
          <p id="livro3">Livro 3</p>
        </div>
      </div>
    </>
  );
}

export default App;
  
         



        

