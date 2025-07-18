import express from 'express';
import { getAllUlkeler } from '../../controllers/Cari/ulkeController.js';

const router = express.Router();

router.get('/', getAllUlkeler);

export default router; 