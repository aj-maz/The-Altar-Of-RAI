//import { DataProvider } from "../data/providers";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  typography: {
    fontFamily: "Golos Text",
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
      main: "#F4D06F",
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

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
