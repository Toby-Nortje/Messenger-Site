import { useEffect, useState } from "react";
import {
    Button,
    Menu,
    MenuItem,
    Typography,
    Paper,
    useTheme,
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CssBaseline,
    AppBar,
    Toolbar
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";
import DnsIcon from '@mui/icons-material/Dns';
import { setCurrentServer, setMessages } from "state";

export const ServerSelector = () => {
    const dispatch = useDispatch();
    const servers = useSelector((state) => state.servers);
    const token = useSelector((state) => state.token);
    const currentServer = useSelector((state) => state.currentServer);

    const [open, setOpen] = useState(false);

    const toggleSlider = () => {
      setOpen(!open);
    };
    const { palette } = useTheme();

    const updateCurrentServer = (server) => {
        dispatch(setCurrentServer({ currentServer: server}));
        dispatch(setMessages({ messages: []}));
    };

    useEffect(() => {
        
    }, []);  /* eslint-disable-line react-hooks/exhaustive-deps */

    

    return (
    <>
      {servers.map((server, index) => {
        const serverIcon = server.name.substring(0,1);
        return (
            <Box position='relative' key={index} backgroundColor={palette.neutral.main} borderRadius='50%' height='50px' width='50px' m='10px' onClick={() => updateCurrentServer(server)}
            sx={{
                '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: palette.neutral.mediumMain
                }
            }}
            >
                <Box
                position='absolute'
                top= '50%'
                left= '50%'
                margin='-12px 0 0 -6px'
                color={palette.primary.light}
                title={server.name}
                >
                    {serverIcon}
                </Box>
            </Box>
        )
      })}
    </>
    )
};