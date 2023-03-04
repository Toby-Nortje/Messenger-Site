import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
    Divider
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import FlexBetween from 'components/FlexBetween';
import MessageWidget from './MessageWidget';
import MyMessageWidget from './MyMessageWidget';
import { setMessages } from 'state';


const ChatWidget = () => {
    const messageEl = useRef(null);

    const currentPage = useSelector((state) => state.currentPage);

    

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const messages = useSelector((state) => state.messages);
    const {palette} = useTheme();

    const getMessages = async () => {

        const response = await fetch(
            `http://localhost:3001/message/get/${currentPage._id}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}`}
        });

        const data = await response.json();
        
    dispatch(setMessages({ messages: data }));
   
    }

    
    

    useEffect(() => {
        
    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    useEffect(() => {
        getMessages();
        
    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    


    return(
        <Box display='flex' height='100%' position='relative'
        sx={{
            flexDirection: 'column',
        }}
        >
        <Box
        id='chatBox'
        ref={messageEl}
        sx={{
            display: 'block',
            flexDirection: 'column',
            flex: '1 1 auto',
            justifyContent: 'flex-end',
        }}>
        {messages.map((message, index) => {
            return(
                <MessageWidget
                    key={index}
                    message={message}
                />
            )
        })}
    
        </Box>
        
        </Box>
    )

};

export default ChatWidget;