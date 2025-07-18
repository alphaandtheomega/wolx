import express from 'express';
import { getIlcelerByIlId } from '../../controllers/UtilControllers/ilceControllers.js';

const router = express.Router();

router.get('/', getIlcelerByIlId);

export default router;
