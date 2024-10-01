import { Request, Response } from "express";
// import admin from "firebase-admin";

// const db = admin.database(); // Usando o Realtime Database

import firebaseAdminApp from './../firebaseAdmin';
import admin from 'firebase-admin'; 

const db = firebaseAdminApp.database();

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, status } = req.body;
  const userId = req.body.uid;  // Verifica o UID do usuário autenticado
  // const createdAt = admin.database.ServerValue.TIMESTAMP;

  if (!title || !description || !status || !userId) {
    res.status(400).json({ error: "Faltando parametros: título, descrição, status e uid são obrigatórios" });
    return;
  }

  if (typeof title !== "string" || typeof description !== "string" || typeof status !== "string" || typeof userId !== "string") {
    res.status(400).json({ error: "título, descrição, status e uid devem ser strings" });
    return;
  }

  try {
    const newTaskRef = db.ref('tasks').push();

    const createdAt = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    await newTaskRef.set({
      title,
      description,
      status,
      createdAt,
      userId,  // Armazena o UID do usuário que criou a tarefa
    });
    
    res.status(201).json({ 
      message: "Tarefa criada com sucesso",
      id: newTaskRef.key
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Lista tarefa por ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Parametro id é obrigatório" });
    return;
  }

  try {
    const taskRef = db.ref(`tasks/${id}`);
    const snapshot = await taskRef.once('value');
    
    if (!snapshot.exists()) {
      res.status(404).json({ error: "Tarefa não encontrada" });
      return;
    }

    res.json({ id: snapshot.key, ...snapshot.val() });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Lista todas as tarefas de um usuário
export const getTasksByUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ error: "Parametro userId é obrigatório" });
    return;
  }

  try {
    const tasksRef = db.ref('tasks').orderByChild("userId").equalTo(userId);
    const snapshot = await tasksRef.once('value');
    
    const tasks: any[] = [];
    snapshot.forEach((childSnapshot) => {
      tasks.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    res.json(tasks);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Atualiza uma tarefa
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (!id) {
    res.status(400).json({ error: "Parametro id é obrigatório" });
    return;
  }

  if (typeof title !== "string" || typeof description !== "string" || typeof status !== "string") {
    res.status(400).json({ error: "Título, descrição e status devem ser strings" });
    return;
  }

  if (!title || !description || !status) {
    res.status(400).json({ error: "Título, descrição e status são obrigatórios" });
    return;
  }

  try {
    const taskRef = db.ref(`tasks/${id}`);
    await taskRef.update({ title, description, status });
    res.status(200).json({ message: "Tarefa atualizada com sucesso" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Exclui uma tarefa
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Parametro id é obrigatório" });
    return;
  }

  try {
    const taskRef = db.ref(`tasks/${id}`);
    await taskRef.remove();
    res.status(200).json({ message: "Tarefa excluída com sucesso" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};