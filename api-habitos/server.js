import express from "express";
import cors from "cors";
import habitRoutes from "./src/routes/habitos.js";  // CORRIGIDO

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/habitos", habitRoutes);

// Servir o front (public/)
app.use(express.static("public"));

const PORT = 3000;
app.listen(PORT, () => console.log("API rodando na porta " + PORT));
