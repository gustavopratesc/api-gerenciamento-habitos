import { habitService } from "../services/habitService.js";

export const habitController = {
  listar(req, res) {
    res.json(habitService.listarHabitos());
  },

  registrar(req, res) {
    const { habitId, valor } = req.body;
    const resultado = habitService.registrar(habitId, valor);
    res.json(resultado);
  },

  progresso(req, res) {
    res.json(habitService.progresso());
  }
};
