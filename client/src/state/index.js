import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'dark',
    user: null,
    token: null,
    currentServer: {
        _id: "63f8beb4d6d28b94d558cdb9",
        name: "Main Server",
        description: "This is the main server. Welcome :D",
        channel: [
            {
                name:"Text chat's",
                page:[
                    {
                        name: "main",
                        description:"main chat",
                        _id:"63f8beb4d6d28b94d558cdbb"
                    }
                ],
                _id:"63f8beb4d6d28b94d558cdba"
        }
        ],
    },
    servers: [],
    currentChannel : null,
    channels: [],
    currentPage : {
        name: '',
        description: ''
    },
    pages: [],
    messages: []
};  // Set's default state

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {  //Used to change mode between light and dark
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setLogin: (state, action) => {  //Used to add the user and token to state aka login
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {  //Used to remove the user and token from state aka logout
            state.user = null;
            state.token = null;
        },
        setServers: (state, action) => {  //Used to update the currently visible server in state
            state.servers = action.payload.servers;
        },
        setCurrentServer: (state, action) => {  //Used to update the currently visible server in state
            state.currentServer = action.payload.currentServer;
        },
        setChannels: (state, action) => {  //Used to update the currently visible server in state
            state.channels = action.payload.channels;
        },
        setCurrentChannel: (state, action) => {  //Used to update the currently visible channel in state
            state.currentChannel = action.payload.currentChannel;
        },
        setPages: (state, action) => {  //Used to update the currently visible server in state
            state.pages = action.payload.pages;
        },
        setCurrentPage: (state, action) => {  //Used to update the currently visible channel in state
            state.currentPage = action.payload.currentPage;
        },
        setMessages: (state, action) => {  //Used to add the users messages into the state
            state.messages = action.payload.messages;
        },
        setMessage: (state, action) => {  //Used to update a single messages' data and add it to the state
            const updatedMessages = state.messages.map((message) => {
                if (message._id === action.payload.message._id) return action.payload.message
                return message;
            });
            state.messages = updatedMessages;
        },
        setFriends: (state, action) => {  //Used to add the users friends into the state
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error('user friends non-existent :(');
            }
        },
    }
});

export const { setMode, setLogin, setLogout, setServers, setCurrentServer, setFriends, setMessages, setMessage, setChannels, setCurrentChannel, setPages, setCurrentPage } = authSlice.actions;
export default authSlice.reducer;