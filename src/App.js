import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline, Paper } from '@mui/material';
import './App.css';
import Page from './components';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#304fff',
        light: '#7B7CFF',
        dark: '#0026CA',
        contrastText: '#FFF',
        darker: '#020B34'
      },
      secondary: {
        light: '#FFF350',
        main: '#FFC107',
        dark: '#C79100',
        glow: '#FFFB00',
        contrastText: '#000000'
      },
      background: {
        default: '#304fff15',
      },
    },
    typography: {
      fontFamily: 'SFProText-Medium',
    },
  })

  return (
    <ThemeProvider
      theme={theme}
    >
      <CssBaseline />
      <Paper
        elevation={0}
        sx={{
          borderRadius: 0,
          minHeight: '100vh'
        }}
      >
        <Page />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
