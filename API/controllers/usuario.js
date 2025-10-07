// controllers/authController.js
import bcrypt from 'bcrypt';
import { db } from '../db.js';

// Função para registrar um novo usuário
export const criarUsuario = async (req, res) => {
    const { nomeUsuario, emailUsuario, senha } = req.body;

    if (!nomeUsuario || !emailUsuario || !senha ) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const [existingUsers] = await db.execute(
            'SELECT idUsuario FROM usuarios WHERE emailUsuario = ?',
            [emailUsuario]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
        }

        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);

        const [result] = await db.execute(
            'INSERT INTO usuarios (nomeUsuario, emailUsuario, senhaHash) VALUES (?, ?, ?)',
            [nomeUsuario, emailUsuario, senhaHash]
        );

        res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            userId: result.insertId,
            nomeUsuario: nomeUsuario,
            emailUsuario: emailUsuario
        });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao registrar usuário.' });
    }
};

