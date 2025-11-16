import { Router } from "express";
import { habitController } from "../controllers/habitController.js";

const router = Router();

router.get("/", habitController.listar);
router.post("/registrar", habitController.registrar);
router.get("/progresso", habitController.progresso);

export default router;
