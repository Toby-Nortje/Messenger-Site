import Server from '../models/Server.js';

// CREATE

export const createServer = async (req, res) => {
    try {
        const { name, description } = req.body;

        const newServer = new Server({
            name,
            description
        });

        await newServer.save();

        const server = Server.find();
        
        res.status(201).json(server);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

// READ

export const getAllServers = async (req, res) => {
    try {
        const server = await Server.find();
        res.status(200).json(server);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getServer = async (req, res) => {
    try {
        const { serverId } = req.params;
        const server = await Server.findById(serverId);
        res.status(200).json(server);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// UPDATE

export const editServer = async (req, res) => {
    try {
        const { serverId } = req.params;
        const { name, description } = req.body;

        const updatedServer = await Server.findByIdAndUpdate(
            serverId,
            {
                name,
                description
            },
            {
                new: true
            }
        );

        res.status(200).json(updatedServer);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// DELETE

export const deleteServer = async (req, res) => {
    try {
        const { serverId } = req.params;

        await Server.findByIdAndDelete(serverId);

        const servers = Server.find();
        res.status(200).json({ message: err.message})
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};