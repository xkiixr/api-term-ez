import { Router } from 'express';

import { getUserGameController } from '../controllers/game.controller';

const router = Router();
router.post('/get-user-name', getUserGameController);

export default router;
