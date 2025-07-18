import express from "express";
import {
  getAllCariler,
  getCarilerById,
  createCariler,
  deleteCariler,
  updateCariler,
  getAllCariSecView,
  getAllCarilerForTable,
  getAllCarilerWithParameters
} from "../../controllers/Cari/cariController.js";
import { authenticateJWT } from "../../middleware/auth.js";

const router = express.Router();

router.get("/", getAllCariler);
router.get("/carisec", getAllCariSecView);
router.get("/table", getAllCarilerForTable);
router.get("/filter", getAllCarilerWithParameters);
router.get("/:id", getCarilerById);
router.post("/", authenticateJWT, createCariler);
router.delete("/:id", deleteCariler);
router.put("/:id", authenticateJWT, updateCariler);

export default router;