import Form from "./Form";
import FlexBetween from 'components/FlexBetween';
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from 'react-redux';

const LoginPage = () => {
    const mode = useSelector((state) => state.mode);
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
    const { palette } = useTheme();

    return (
        <Box
        width='100%'
        p='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        >
           <Box
           flexBasis={isNonMobileScreens ? '50%' : undefined}
           backgroundColor={palette.background.dark}
           p='2rem'
           borderRadius='1rem'
           >
             <Form/>
           </Box>
        </Box>
    )
}

export default LoginPage;