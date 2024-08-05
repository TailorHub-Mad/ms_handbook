import { CreateConversation } from '@controllers/openai.controller';
import { Router } from 'express';

const router = Router();

router.post('/conversation', CreateConversation);

export const OpenaiRoute = { path: '/openai', router };
