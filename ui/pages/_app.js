//import { DataProvider } from "../data/providers";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const darkTheme = createTheme({
  typography: {
    fontFamily: "'Electrolize', sans-serif",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#000",
      paper: "#493E7F",
    },
    lavendar: {
      main: "#e45829",
      light: "#B3A8FF",
    },
    secondary: {
      main: "#e65219",
    },
    background: {
      default: "#322f2d",
      paper: "#000",
      secondary: "#443569",
    },
    error: {
      main: "#FF004F",
    },
    pink: {
      main: "#FC1E9A",
      light: "#fd8ecc",
    },
    simple: {
      main: "#F5FBEF",
      contrastText: "#000",
    },
    error: {
      main: "#e76d89",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "rgb(20 21 33 / 18%) 0px 2px 10px 0px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { borderRadius: "8px !important" },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/ajand/altar-of-rai",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
