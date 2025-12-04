import express from 'express';
import { getAutomations, simulate } from '../controllers/workflowController.js';

const router = express.Router();

router.get('/automations', getAutomations);
router.post('/simulate', simulate);

export default router;
