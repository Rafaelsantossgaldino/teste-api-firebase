import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import { requestInterceptor } from "./utils/requestInterceptor";
import firebaseAdminApp from './firebaseAdmin';  // Importa a instância inicializada
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("*", requestInterceptor);

// Usar as rotas
// app.use("/register", authRoutes);
app.use("/login", authRoutes);
app.use("/tasks", taskRoutes);

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

// Define a porta para o servidor
const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
const regularServer = http.createServer(app);
runServer(serverPort, regularServer);