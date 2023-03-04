import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
    Divider,
    InputBase,
    IconButton,
    Button
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import FlexBetween from 'components/FlexBetween';
import Dropzone from 'react-dropzone';
import { DeleteOutline, ImageAspectRatioOutlined } from '@mui/icons-material';
import { createId } from '@paralleldrive/cuid2';
import { setMessages } from 'state';

const MyMessageWidget = () => {
    const isNonMobileScreens = useMediaQuery('(min-width: 800px)');
    const user = useSelector((state) => state.user);
    const [myMessage, setMyMessage] = useState('');
    const [image, setImage] = useState(null);
    

    const servers = useSelector((state) => state.servers);


    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const messages = useSelector((state) => state.messages);
    const currentPage = useSelector((state) => state.currentPage);
    const {palette} = useTheme();

    const handleMessage = async () => {
        const formData = new FormData();
        formData.append('userId', user._id);
        formData.append('description', myMessage);
        if(image) {
            formData.append('picture', image);
            formData.append('picturePath', `${image.name}`);
        }
        const response = await fetch(
            `http://localhost:3001/message/${currentPage._id}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`},
                body: formData
            });

            const data = await response.json();
            dispatch(setMessages({messages: data}));
            setImage(null);
            setMyMessage('');
            
    }

    return (
        <Box
        p='1rem 2%'
        m='1rem 0.5rem'
        borderRadius='10px'
        backgroundColor={palette.neutral.light}
        >
            
            {image && (
                <Box display='flex'>
                
                    <Typography>{image.name}</Typography>
                    
                    
                </Box>
            )}
            
        
           <FlexBetween gap='1rem'>
           <Box sx={{
            '&:hover': {
                cursor: 'pointer'
            }
           }}>
           <Dropzone 
                acceptedFiles=".jpg, .jpeg, .png"
                multiple={false}
                onDrop={(acceptedFiles) => {
                    setImage(acceptedFiles[0])

                    }}
                >
                {({getRootProps, getInputProps}) => (
                    <Box>
                        <Box
                        {...getRootProps()}
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                        >
                        <input {...getInputProps()}/>
                        {!image ? (

                        <AddCircleIcon/>
                        ) : (
                            <IconButton
                            onClick={() => setImage(null)}
                            >
                              <RemoveCircleIcon/>
                            </IconButton>
                        )}
                        </Box>
                    </Box>
                )}
                </Dropzone>
           </Box>
           <Box color={palette.neutral.main} width='100%'>
           <InputBase
              placeholder={`# ${currentPage.name}`}
              onChange={(e) => {setMyMessage(e.target.value)}}
              onKeyDown={(e) => {
                if(e.key === 'Enter' && myMessage) {
                    handleMessage();
                }
              }}
              value={myMessage}
              sx={{
                width: '100%'
              }}
           />
           </Box>
           <Button
           disabled={!myMessage}
           onClick={handleMessage}
           sx={{
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: '3rem'
                }}
           >
            Send
           </Button>
           </FlexBetween>
           
        
        </Box>
    )
};

export default MyMessageWidget;