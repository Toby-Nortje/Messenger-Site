import { useState } from 'react';
import { 
    Box, 
    IconButton, 
    InputBase, 
    Typography, 
    Select, 
    MenuItem, 
    FormControl, 
    useTheme, 
    useMediaQuery,
    Divider
} from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
    Person
} from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const page = useSelector((state) => state.currentPage);
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

    const { palette } = useTheme();

    return(
        <FlexBetween padding="1rem 2%" backgroundColor={palette.background.alt}>
        <FlexBetween gap="1.75rem">
            <Typography ># {page.name}</Typography>
            <Typography >|</Typography>
            <Typography >{page.description}</Typography>
        </FlexBetween>
        <Person/>
        </FlexBetween>
    )
};

export default Navbar;