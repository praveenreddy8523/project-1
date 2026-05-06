import { useState } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import './App.css'
import AppRoutes from './routes/AppRoutes';
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: "#493b19", // Change this to your desired primary color
    },
  },
});

function App() {
  const [count, setCount] = useState(0);


  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <AppRoutes/>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
