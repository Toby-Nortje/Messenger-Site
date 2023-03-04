import { useEffect, useState } from "react";
import {
    Button,
    Menu,
    MenuItem,
    Typography,
    Paper,
    useTheme,
    Box,
    Divider
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { setCurrentPage, setMessages } from "state";

export const ServerMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [channelIndex, setChannelIndex] = useState(null);
    const [pageIndex, setPageIndex] = useState(null);
    const [pageData, setPageData] = useState(null);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const mode = useSelector((state) => state.mode);
    const message = useSelector((state) => state.messages);
    const otherMode = (mode==='light')?('dark'):('light');
    const currentServer = useSelector((state) => state.currentServer);
    const currentPage = useSelector((state) => state.currentPage);

    const channels = currentServer.channel;    
    
    
    // const server = useSelector((state) => state.currentServer);
    
    // const channels = useSelector((state) => state.channels);
    // const pages = useSelector((state) => state.pages);
    // const messages = useSelector((state) => state.messages);


    const { palette } = useTheme();


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getPageMessages = async (page) => {
        
        if(page) {
            
            const response = await fetch(
                `http://localhost:3001/message/get/${page._id}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}`}
            });
    
            const data = await response.json();
            
            
        //const messages = currentServer.channel[channelNum].page[pageNum].message;
        dispatch(setMessages({ messages: data }));
        dispatch(setCurrentPage({ currentPage: page}));
        
        }
    }

    useEffect(() => {
        
        
    }, []); /* eslint-disable-line react-hooks/exhaustive-deps */

    return (
        <Box>
        <Box
        p='0.5rem 0.5rem'
        alignItems='center'
        justifyContent='center'
        >
          <FlexBetween 
          
          >
            <Typography>
                {currentServer.name}
            </Typography>
            <Button
            id='server-button'
            aria-controls={open ? 'server-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}

            >
                {open ? (<CloseIcon/>) : (<KeyboardArrowDownIcon/>)}
            </Button>
          </FlexBetween>
          <Menu
            id='server-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            elevation={0}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            MenuListProps={{
                'aria-labelledby': 'server-button'
            }}
            
            >
                <MenuItem onClick={() => dispatch(setMode())}>{`Change to ${otherMode} mode`}</MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Menu>
        </Box>
        <Divider/>
        <Box
        p='0.5rem 0.5rem'
        alignItems='center'
        justifyContent='center'
        >
            {channels.map((channel, index1) => {
                
                return (
                    <Box key={ index1 }>
                        <Typography
                        sx={{
                            textDecoration: 'underline'
                        }}
                        >{channel.name}</Typography>
                        {channels[index1].page.map((page, index2) => {
                            
                            return (
                                <Typography 
                                key={index2}
                                pl='1rem' 
                                // onClick={() => dispatch(setCurrentPage({ currentPage: page}))}
                                onClick={()=> getPageMessages(page)}
                                sx={{
                                    '&:hover': {
                                        cursor: 'pointer'
                                    }
                                }}
                                >{page.name}</Typography>
                            )
                        })}
                    </Box>
                    )
            })}
        </Box>
        </Box>
    )
}