import express from "express";
import {
  getAllCariHareketleri,
  getCariHareketleriById,
  createCariHareketleri,
  updateCariHareketleri,
  deleteCariHareketleri
} from "../../controllers/Cari/cariHareketleri.js";
import { authenticateJWT } from "../../middleware/auth.js";

const router = express.Router();

router.get("/", getAllCariHareketleri);
router.get("/:id", getCariHareketleriById);
router.post("/", authenticateJWT, createCariHareketleri);
router.put("/:id", authenticateJWT, updateCariHareketleri);
router.delete("/:id", authenticateJWT, deleteCariHareketleri);

export default router;
