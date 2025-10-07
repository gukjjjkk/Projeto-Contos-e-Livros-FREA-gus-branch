import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";




function LoginUser (){
    const [formData, setFormData] = useState({
        nomeUsuario: "",
        emailUsuario: "",
        senhaHash: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            // Envia dados para o backend
            const res = await axios.post("/api/Login", formData);
            if (res.data && res.data.usuario) {
                setUser(res.data.usuario); // Atualiza contexto global
                navigate("/Perfil"); // Redireciona para perfil
            } else {
                setError("Usuário ou senha inválidos.");
            }
        } catch (err) {
            setError("Erro ao realizar login.");
        }
    };

    return (
        <form className="form-cadastro" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                name="emailUsuario"
                type="email"
                placeholder="Email"
                value={formData.emailUsuario}
                onChange={handleChange}
                required
            />
            <input
                name="senhaHash"
                type="password"
                placeholder="Senha"
                value={formData.senhaHash}
                onChange={handleChange}
                required
            />
            {error && <div className="error">{error}</div>}
            <button type="submit">Entrar</button>
        </form>
    );
}

export default LoginUser;
























