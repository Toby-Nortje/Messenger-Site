import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';

import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { themeSettings } from './theme';


function App() {
  
  const mode = useSelector((state) => state.mode);  //Grabs the mode from state
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);  //creates a theme based off the current mode | useMemo() updates the value when mode changes
  const isAuth = Boolean(useSelector((state) => state.token));  //Confirms whether the user has gained a token or not
  return (
    <div className={(mode === 'light') ? 'light-mode' : 'dark-mode'}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes >
            <Route path='/' element={<LoginPage/>} />
            <Route path='/home' element={isAuth ? (<HomePage/>) : (<Navigate to='/'/>) }/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
