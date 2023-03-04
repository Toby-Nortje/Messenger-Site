import express from 'express';
import { createServer, getServer, getAllServers, editServer, deleteServer } from '../controllers/server.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// CREATE

router.post('/', createServer);

// READ


router.get('/', getAllServers);
router.get('/:serverId', getServer);

// UPDATE

router.patch('/:serverId', editServer);

// DELETE

router.delete('/serverId', deleteServer);

export default router;