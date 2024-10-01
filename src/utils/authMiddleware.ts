import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token não fornecido ou inválido" });
    return;  
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.body.uid = decodedToken.uid;  // Passa o UID do usuário autenticado para o próximo middleware
    next();
  } catch (error: any) {
    console.error("Erro na verificação do token: ", error);
    res.status(401).json({ error: "Falha ao verificar o token de autenticação" });
  }
};