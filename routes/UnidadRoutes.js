
import express from 'express';
import { 
    createUnidad, 
    deleteUnidad, 
    getAllUnidades, 
    getUnidad, 
    updateUnidad,
    loginUnidad 
} from '../controllers/UnidadController.js';

const router = express.Router();

router.get('/', getAllUnidades);
router.get('/:id', getUnidad);
router.post('/', createUnidad);
router.post('/login', loginUnidad);
router.put('/:id', updateUnidad);
router.delete('/:id', deleteUnidad);

export default router;