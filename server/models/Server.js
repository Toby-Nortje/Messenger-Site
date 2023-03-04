import mongoose from "mongoose";
import Message from "./Message.js";

const serverSchema = new mongoose.Schema({
    name: String,
    description: String,
    channel: [{
        name: String,
        page: [{
            name: String,
            description: String
        }]
    }]
});

const Server = mongoose.model('Server', serverSchema);

export default Server;
