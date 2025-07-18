import express from "express";
import { getParametreler, updateParametre, getParametreById } from "../../controllers/Ayarlar/parametreController.js";
import { authenticateJWT } from "../../middleware/auth.js";

const router = express.Router();

// Tüm parametreleri getir
router.get("/", getParametreler);
// Tek bir parametreyi getir
router.get("/:parametreid", getParametreById);
// Parametre güncelle/ekle
router.post("/", authenticateJWT, updateParametre);

export default router; 