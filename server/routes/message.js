import express from 'express';
import { createMessage, getMessage, getMessages, editMessage, deleteMessage } from '../controllers/message.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// CREATE

//router.post('/:serverId', createMessage); In index.js

// READ

router.get('/:pageId/:channelNum/:pageNum', getMessage);
router.get('/get/:pageId', getMessages);

// UPDATE

//router.patch('/:messageId', editMessage); In index.js

// DELETE

router.delete('/:messageId', deleteMessage);

export default router;