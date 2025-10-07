import { db } from "../db.js";
import bcrypt from "bcrypt";

export const Login = async (req,res)=>{
    const {  emailUsuario, senha } = req.body;
    if ( !emailUsuario || !senha) {
        return res.status(400).json({ message: 'Digite o email e a senha.' });
    }

    try{
        const [rows]= await db.execute("SELECT * FROM usuarios WHERE email = ?",[emailUsuario])
        if(rows.length===0){
            return res.status(401).json({ error: "Usuário não encontrado" });
        }
    const usuario = rows[0];

    // 2. Compara senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    // 3. Gera token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET || "segredo",
      { expiresIn: "1h" }
    );

    // 4. Retorna sucesso
    res.json({ message: "Login realizado com sucesso", token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};


    
