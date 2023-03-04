import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
    Divider
} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import ServerTab from "scenes/serverTab";

import { setServers, setChannels, setPages, setMessages, setCurrentServer } from 'state';
import Navbar from 'scenes/navbar';
import ChatWidget from 'scenes/widgets/ChatWidget';
import { SignalWifiStatusbarNullTwoTone } from '@mui/icons-material';
import MyMessageWidget from 'scenes/widgets/MyMessageWidget';


const HomePage = () => {
    const isNonMobileScreens = useMediaQuery('(min-width: 800px)');
    const dispatch = useDispatch();
    const currentServer = useSelector((state) => state.currentServer);
    const currentChannel = useSelector((state) => state.currentChannel);
    const currentPage = useSelector((state) => state.currentPage);
    const token = useSelector((state) => state.token);
    const messages = useSelector((state) => state.messages);

    

    const { palette } = useTheme();

    const setDefaultServer = async () => {
        const response = await fetch(
            `http://localhost:3001/server/63f8beb4d6d28b94d558cdb9`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}`}
        });

        const data = await response.json();
        dispatch(setCurrentServer({ currentServer: data}));
    };

    const updateServer = async () => {
                
        const response = await fetch(
            `http://localhost:3001/server/${currentServer._id}`, 
            {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}`}
            }
        );

        const data = await response.json();
        dispatch(setCurrentServer({ currentServer: data }));
    }

    const getServers = async () => {
        const response = await fetch(
            `http://localhost:3001/server`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`},
        });

        const data = await response.json();
        dispatch(setServers({ servers: data}));
    };

    
    if (!currentServer) {
        setDefaultServer();
    }
    

    useEffect(() => {
        
        getServers();
        const chatBox = document.getElementById('chatBox');
        if (chatBox.lastChild) {
            chatBox.lastChild.scrollIntoView();
        }
        
        
        
        
    }, [messages]); /* eslint-disable-line react-hooks/exhaustive-deps */
    


    return (
        <Box
        width='100%'
        height='100vh'
        display='flex'
        position='relative'
        >
            <Box
            flexBasis={isNonMobileScreens ? '320px' : '40%'}
            width='100%'
            backgroundColor={palette.background.alt}
            >
                <ServerTab/>
            </Box>
            <Divider orientation='vertical'/>
            <Box
            flexBasis={isNonMobileScreens ? '77%' : '60%'}
            sx={{
                display: 'flex',
                flexFlow: 'column',
                height: '100vh'
            }}
            >
            <Box sx={{
                flex: '0 1 auto'
            }}
            >
            {currentPage ? (<Navbar />) : null}
            </Box>
            <Box sx={{
                flex: '1 1 auto',
                maxHeight: '100%',
                overflow: 'auto',

            }}
            >
            {currentPage ? (<ChatWidget />) : null}
               
            </Box>
            <Box 
            position='relative'
            sx={{
                flex: '0 1 40px',
                
            }}>
               <MyMessageWidget />
            </Box>
            </Box>
        </Box>
    )
}

export default HomePage;