import express from 'express';
import { getIller } from '../../controllers/UtilControllers/ilControllers.js';

const router = express.Router();

router.get('/', getIller);

export default router;
