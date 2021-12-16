import './App.css'

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import { TrackexProvider } from './contexts/trackexContext'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './components/AppRoutes'
require('dotenv').config()

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF7661',
      contrastText: '#fff',
    },
    text: {
      primary: '#fff',
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        color: '#fff',
        fontWeight: 'normal',
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: '1px solid #FF7661',
        },
        '&:hover': {
          borderBottom: '1px solid #FF7661',
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: '#fff',
        fontWeight: 600,
        paddingBottom: '16px',
      },
    },
    MuiRadio: {
      root: {
        color: '#fff',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: '#1C2633',
        color: 'white',
      },
    },
    MuiDialogContent: {
      root: {
        color: 'white',
      },
    },
    MuiDialogContentText: {
      root: {
        color: 'white',
      },
    },
  },
})

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TrackexProvider>
          <MuiThemeProvider theme={theme}>
            <AppRoutes />
          </MuiThemeProvider>
        </TrackexProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App