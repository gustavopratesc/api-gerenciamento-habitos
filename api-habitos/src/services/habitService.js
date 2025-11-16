import { readJSON, writeJSON } from "../utils/fileUtils.js";
import { verificarHabito } from "../utils/verificador.js";

const HABITOS = [
  { id: 1, nome: "Beber 2L de água", tipo: "quantidade", meta: 2000 },
  { id: 2, nome: "Ler 10 páginas", tipo: "quantidade", meta: 10 },
  { id: 3, nome: "Exercício 30 min", tipo: "quantidade", meta: 30 },
  { id: 4, nome: "Dormir 8 horas", tipo: "quantidade", meta: 8 },
  { id: 5, nome: "Evitar açúcar", tipo: "boolean" }
];

export const habitService = {
  listarHabitos() {
    return HABITOS;
  },

  registrar(habitId, valor) {
    const registros = readJSON("data/registros.json");
    const progresso = readJSON("data/progresso.json");

    const hoje = new Date().toISOString().split("T")[0];
    const habit = HABITOS.find(h => h.id === habitId);

    if (!registros[hoje]) registros[hoje] = [];

    const cumpriu = verificarHabito(habit, valor);

    registros[hoje].push({ habitId, valor, cumpriu });

    // Streak
    if (cumpriu) {
      let streak = progresso.streak;

      if (!progresso.ultimoDia) {
        streak = 1;
      } else {
        const diff = (new Date(hoje) - new Date(progresso.ultimoDia)) / (1000 * 60 * 60 * 24);
        streak = diff === 1 ? streak + 1 : 1;
      }

      progresso.streak = streak;
      progresso.ultimoDia = hoje;

      progresso.pontos += 10;

      if (streak === 5) progresso.pontos += 10;
      if (streak === 10) progresso.pontos += 20;
      if (streak === 20) progresso.pontos += 50;
    }

    writeJSON("data/registros.json", registros);
    writeJSON("data/progresso.json", progresso);

    return { cumpriu };
  },

  progresso() {
    return readJSON("data/progresso.json");
  }
};
