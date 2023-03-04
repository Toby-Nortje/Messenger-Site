import { ServerMenu } from "./ServerMenu";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { ServerSelector } from "./ServerSelector";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';



const ServerTab = () => {

    const user = useSelector((state) => state.user);
    const {palette} = useTheme();

    return(
        <FlexBetween height='100vh'>
        <Box
        flexBasis='25%'
        alignSelf='start'
        height='100vh' position='relative'
        >
            <ServerSelector />
            <Box position='absolute' bottom='0' backgroundColor={palette.neutral.light} borderRadius='50%' height='50px' width='50px' m='10px'  
            sx={{
                zIndex: '10',
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
            >+</Box>
            </Box>
        </Box>
        <Divider orientation='vertical'/>
        <Box 
        flexBasis='75%'
        alignSelf='start'
        height='100vh' position='relative'
        >
        <ServerMenu/>
        
        <Box position='absolute' bottom='0' backgroundColor={palette.neutral.light} width='100%' p='1rem 0.5rem' sx={{zIndex: '10'}}>
        <FlexBetween>
            <Typography>{user.firstName} {user.lastName}</Typography>
            <ManageAccountsIcon/>
        </FlexBetween>
        </Box>
        
        </Box>
        </FlexBetween>
        
    )
}

export default ServerTab;