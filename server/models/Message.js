import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    pageId: {
        type: String,
    },
    userDisplayName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    picturePath: {
        type: String,
        default: ''
    },
    userPicturePath: {
        type: String,
        default: ''
    }
},{ timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;