import "./App.css";

import { NavBar } from "./components/NavBar";
import { TransactionList } from "./components/TransactionList";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF7661",
      contrastText: "#fff",
    },
    text: {
      primary: "#fff",
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        color: "#fff",
        fontWeight: "normal",
      },
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "1px solid #FF7661",
        },
        "&:hover": {
          borderBottom: "1px solid #FF7661",
        },
      },
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className='layout'>
        {/* <NavBar /> */}
        <TransactionList />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
