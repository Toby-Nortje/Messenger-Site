import { 
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,  
} from "@mui/icons-material";
import { 
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { setMessages } from "state";


const MessageWidget = ({message}) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const messages = useSelector((state) => state.messages);
    

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    return(
        <WidgetWrapper mb='5px'>
        <FlexBetween gap='1rem'>
        <Box sx={{
                    display: 'flex',
                    alignSelf: 'flex-start'
        }}
        >
        <UserImage 
                image={message.userPicturePath ? (message.userPicturePath) : ('default-user-image.jpg')}
                size='55px'
        />
        </Box>
            
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Box sx={{
                    color: primary
                }}>
                {message.userDisplayName}
                </Box>
                <Box>
                {message.description}
                </Box>
                <Box>
                    {message.picturePath && (
                        <img 
                            width='auto'
                            height='auto'
                            alt='messageImg'
                            src={`http://localhost:3001/assets/${message.picturePath}`}
                        />
                    )}
                </Box>
            </Box>
        </FlexBetween>

        </WidgetWrapper>
    )

};

export default MessageWidget;