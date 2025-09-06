import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Chat from './components/Chat';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: '#1a237e', // Deep indigo
      light: '#534bae',
      dark: '#000051',
    },
    secondary: {
      main: '#ff5252', // Coral red
      light: '#ff867c',
      dark: '#c50e29',
    },
    background: {
      default: darkMode ? '#0a0a1a' : '#f5f7ff',
      paper: darkMode ? '#1a1a2e' : '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;