import Message from '../models/Message.js';
import Server from '../models/Server.js';
import User from '../models/User.js';

// CREATE

export const createMessage = async (req, res) => {
    try {
        const { pageId } = req.params;
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newMessage = new Message({
            userId,
            pageId,
            userDisplayName: user.displayName,
            description,
            picturePath,
            userPicturePath: user.picturePath,
        });

        await newMessage.save();

        const message = await Message.find({ pageId });
        res.status(201).json(message);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

// READ

export const getMessage = async (req, res) => {
    try {
        const { pageId, pageNum, channelNum } = req.params;

        const serverPage = await Server.find({
            'channel.page': {
                $elemMatch: {
                    _id: pageId
                }
            }
        });
        res.status(200).json(serverPage[0].channel[channelNum].page[pageNum].message);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getMessages = async (req, res) => {
    try {
        
        const { pageId } = req.params;

        const messages = await Message.find({ pageId: pageId});

        res.status(200).json(messages);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
// UPDATE

export const editMessage = async (req, res) => {
    try {
        const { serverId, channelId, pageId, messageId } = req.params;
        const { description, picturePath } = req.body;

        const update = await Server.findOneAndUpdate(
            {
                _id: serverId,
                channel: {
                    _id: channelId,
                    page: {
                        _id: pageId,
                        message: {
                            _id: messageId
                        }
                    }
                }
            },
            { '$set': { 'message.description': description, 'message.picturePath': picturePath}}
        );

        res.status(200).json(update);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// DELETE

export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;

        await Message.findByIdAndDelete(messageId);

        const messages = await Message.find();
        res.status(201).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}