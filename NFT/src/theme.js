import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#ffc926",
    },
    secondary: {
      main: "#088ef3",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 700,
      marginBottom: "16px",
    },
    h5: {
      fontWeight: 600,
      marginBottom: "12px",
    },
    h6: {
      fontWeight: 500,
      marginBottom: "8px",
    },
    subtitle1: {
      fontWeight: 400,
      marginBottom: "8px",
    },
    caption: {
      fontStyle: "italic",
    },
  },
});

export default theme;
