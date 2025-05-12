import express from 'express';
import { 
    createMessage, 
    deleteMessage, 
    getAllMessage, 
    getMessage, 
    updateMessage 
} from '../controllers/MessageController.js';

const router = express.Router();

router.get('/', getAllMessage);
router.get('/:id', getMessage);
router.post('/', createMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;