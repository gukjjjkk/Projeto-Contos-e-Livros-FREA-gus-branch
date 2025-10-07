//Abner de Oliveira Feitoza Passos
import express from "express";
import cors from "cors";
import { db } from "./db.js";
import ObrasRoutes from './routes/obras.js'
import dotenv from "dotenv";
import autoresRoutes from "./routes/autores.js";
import ilustradoresRoutes from "./routes/ilustradores.js";
import editoraRoutes from "./routes/editora.js";
import palavraChaveRoutes from "./routes/palavras-chave.js";
import ObrasAcessadasRoutes from "./routes/ObrasAcessadas.js";
import UsuarioRoutes from "./routes/usuario.js"
import AcessosRoutes from "./routes/acessos.js";
import FavoritosRoutes from "./routes/favoritos.js";
import LoginRoutes from "./routes/Login.js"


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

//Import Rotas App
app.use("/api/obras", ObrasRoutes);
app.use("/api/autores", autoresRoutes);
app.use("/api/ilustradores", ilustradoresRoutes);
app.use("/api/editora", editoraRoutes);
app.use("/api/palavraschave", palavraChaveRoutes);
app.use("/api/ObrasAcessadas", ObrasAcessadasRoutes);
app.use("/api/Usuarios", UsuarioRoutes);
app.use("/api/Acessos", AcessosRoutes);
app.use("/api/Favoritos", FavoritosRoutes);
app.use("/api/Login", LoginRoutes);



db.getConnection()
  .then(() => console.log("Conectado ao Banco"))
  .catch((err) => console.log("Erro na conexão do banco: " + err));


app.get("/", (req,res)=>{  
  res.json("BACKEND FREA");
})



const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});