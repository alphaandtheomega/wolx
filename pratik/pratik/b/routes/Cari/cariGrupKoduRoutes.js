import express from "express";
import { getAllCariGrupKodlari, addCariGrupKodu, deleteCariGrupKodu, updateCariGrupKodu } from "../../controllers/Cari/cariGrupKoduController.js";
import { authenticateJWT } from "../../middleware/auth.js";

const router = express.Router();

// Tüm grup kodlarını getir
router.get("/", getAllCariGrupKodlari);

// Yeni grup kodu ekle
router.post("/", authenticateJWT, addCariGrupKodu);

// Silme
router.delete("/:id", authenticateJWT, deleteCariGrupKodu);

// Güncelleme
router.put("/:id", authenticateJWT, updateCariGrupKodu);

export default router;
