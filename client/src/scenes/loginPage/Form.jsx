import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { Formik } from 'formik'  //A react API to help with creating forms
import * as yup from 'yup';  //A schema builder that handles runtime value parsing and validation
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';
import Dropzone from 'react-dropzone';
import FlexBetween from 'components/FlexBetween';


const registerSchema = yup.object().shape({  //Sets up the registration schema with yup
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required'),
    displayName: yup.string(),
    picture: yup.string(),
    description: yup.string()
});

const loginSchema = yup.object().shape({  //Sets up the login schema with yup
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required')
});

const initialValuesRegister = {  //Creates the initial register values for Formik
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    displayName: '',
    picture: '',
    description: ''
};

const initialValuesLogin = {  //Creates the initial login values for Formik
    email: '',
    password: '',
};


const Form = () => {
    const [pageType, setPageType] = useState('login');  //Sets default page as login
    const { palette } = useTheme();  //imports our palette from the theme
    const dispatch = useDispatch();  //Allows us to make calls to our redux store
    const navigate = useNavigate();  //Allows us to navigate the user to different pages
    const isNonMobileScreens = useMediaQuery('(min-width: 600px)');  //Checks if the user is on mobile
    const isLogin = pageType === 'login';
    const isRegister = pageType === 'register';

    const register = async (values, onSubmitProps) => {  
        const formData = new FormData();  //Creates a form so we can include a file aka the image
        for (let value in values) {
            formData.append(value, values[value]);  //Appends data to the form where the name of the item is the same as the data variable aka: {firstName: firstname}
        }
        if(values.picture) {
        formData.append('picturePath', values.picture.name);  //Adds the name of the picture as it's path aka public/assets/{name}
        }
        const savedUserResponse = await fetch(  
            'http://localhost:3001/auth/register',
            {
                method: 'POST',
                body: formData
            }
        );

        const savedUser = savedUserResponse.json();  //Turns the data into a json to be usuable

        onSubmitProps.resetForm();  //Resets the form so it looks clean

        if (savedUser) {
            setPageType('login');  //Changes the page to the login view
        }
    };

    const login = async (values, onSubmitProps) => {  
        const loggedInResponse = await fetch(
            'http://localhost:3001/auth/login',
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"}, //Just used to show the server that json data was sent
                body: JSON.stringify(values)  //Sends over the email and password to the backend for validation
            }
        );

        const loggedIn = await loggedInResponse.json();  //Turns the returned data into a json to be usuable

        onSubmitProps.resetForm();
        

        if (loggedIn) {  //If the client recieved a response and the details were valid set the user and token from the recieved data in state
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate('/home');  //Redirect to the home page
        }
    };

    const handleFromSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);  //Calls the login function
        if (isRegister) await register(values, onSubmitProps);  //Calls the register function
    };

    return (
        <div>
        <Typography>{isLogin ? 'Login' : 'Create an account'}</Typography>
        <Formik  //Set up Formik with it's requifred default data
        onSubmit={handleFromSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
        >
        {({  //Create the form using Formiks given values and functions
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm
        }) => (
            <form onSubmit={handleSubmit}>
            <Box  //Styling :D
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
                '& > div':{gridColumn: isNonMobileScreens ? undefined : 'span 4'}
            }}
            >
            {isRegister && (  
            <>
                <TextField 
                    label='First Name'
                    autoComplete='off'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name='firstName'
                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}  //Call error if touched AND there is an error aka will only show an error if the field has been interacted with and untouched again
                    helperText={touched.firstName && errors.firstName}  //Show requirements if there is an error
                    sx={{ gridColumn: 'span 2', backgroundColor: palette.background.alt}}  //Take up 2 of 4 columns
                />

                <TextField 
                    label='Last Name'
                    autoComplete='off'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name='lastName'
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}  
                    helperText={touched.lastName && errors.lastName}  
                    sx={{ gridColumn: 'span 2', backgroundColor: palette.background.alt}}
                    backgroundColor={palette.background.alt}
                />

                <TextField 
                    label='Display Name'
                    autoComplete='off'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.displayName}
                    name='displayName'
                    error={Boolean(touched.displayName) && Boolean(errors.displayName)}  
                    helperText={touched.displayName && errors.displayName}  
                    sx={{ gridColumn: 'span 4', backgroundColor: palette.background.alt}}  //Take up the full column
                />

                <TextField 
                    label='Description'
                    autoComplete='off'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name='description'
                    error={Boolean(touched.description) && Boolean(errors.description)}  
                    helperText={touched.description && errors.description}  
                    sx={{ gridColumn: 'span 4', backgroundColor: palette.background.alt}}  //Take up the full column
                />

                <Box 
                gridColumn='span 4'
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius='5px'
                p='1rem'
                >
                    <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(acceptedFiles) => 
                        setFieldValue('picture', acceptedFiles[0])
                    }
                    >
                        {({ getRootProps, getInputProps }) => (
                            <Box
                            {...getRootProps()}  //Spread the root props
                            border={`2px dashed ${palette.neutral.main}`}
                            p='1rem'
                            textAlign='center'
                            sx={{ '&:hover': {cursor: 'pointer'}, backgroundColor: palette.background.alt}}
                            >
                                <input {...getInputProps()}/> {/*  Spread the input props */}
                                {!values.picture ? ( //If there hasnt been a dropped file yet
                                <p>Add picture here</p>
                                ) : (
                                    <FlexBetween>
                                        <Typography>{values.picture.name}</Typography>
                                        <EditOutlined/>
                                    </FlexBetween>
                                )}
                            </Box>
                        )}
                    </Dropzone>
                </Box>
                </>
            )}
                <TextField 
                    label='Email'
                    autoComplete='off'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name='email'
                    error={Boolean(touched.email) && Boolean(errors.email)}  
                    helperText={touched.email && errors.email}  
                    sx={{ gridColumn: 'span 4', backgroundColor: palette.background.alt}}  //Take up the full column
                />

                <TextField 
                    label='Password'
                    type='password'
                    autoComplete='off'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name='password'
                    error={Boolean(touched.password) && Boolean(errors.password)}  
                    helperText={touched.password && errors.password}  
                    sx={{ gridColumn: 'span 4', backgroundColor: palette.background.alt}}  //Take up the full column
                />

            </Box>
            {/* Buttons */}
            <Box>
                <Button
                fullWidth
                type='submit'
                sx={{
                    m: '2rem 0',
                    p: '1rem',
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    '&:hover': {
                        color: palette.primary.main
                    }
                }}
                >
                {isLogin ? 'LOGIN' : 'REGISTER'}
                </Button>
                <Typography
                onClick={() => {
                    setPageType(isLogin ? 'register' : 'login');
                    resetForm();
                }}
                sx={{
                    textDecoration: 'underline',
                    color: palette.primary.main,
                    '&:hover': {
                        cursor: 'pointer',
                        color: palette.primary.light
                    }
                }}
                >
                {isLogin 
                ? "Don't have account? Register here!" 
                : "Already have an account? Login here!"}
                </Typography>
            </Box>
            </form>
        )}
        </Formik>
        </div>
    )
};

export default Form;