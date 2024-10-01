import { Request, Response } from "express";
import admin from "firebase-admin";

// Rota para registro de usuários
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  
  if(!email || !password) {
    res.status(400).json({ error: "E-mail e senha são obrigatórios" });
    return;
  }

  try {
    const userRecord = await admin.auth().createUser({ email, password });
    res.status(201).json({ 
      message: "Usuário criado com sucesso",
      uid: userRecord.uid
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Rota para login de usuários
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "E-mail é obrigatório" });
    return;
  }

  try {
    // Encontra o usuário pelo e-mail
    const userRecord = await admin.auth().getUserByEmail(email);

    // Gera um Custom Token para o usuário encontrado
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    // Retorna o UID do usuário e o token customizado
    res.json({
      message: "Usuário logado com sucesso",
      uid: userRecord.uid,
      token: customToken
    });
  } catch (error: any) {
    res.status(401).json({ error: "Credenciais inválidas" });
  }
};

export const recoverAccount = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "E-mail é obrigatório" });
    return;
  }

  try {
    // Envia um e-mail de redefinição de senha
    await admin.auth().generatePasswordResetLink(email);
    res.json({ message: "E-mail de recuperação de conta enviado com sucesso" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};