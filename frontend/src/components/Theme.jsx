import { createTheme } from '@mui/material/styles';


const demoTheme = createTheme({
    mode: 'dark',
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
      values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    },
    palette: {
        mode: "dark",
        common:{
            black: "#000",
            white:"#fff",
        },
        primary:{
            main:"#98FF98",
            dark:"#98FF98",
            contrastText: "#333333"
        },
        secondary: {
            main: '#50c878',    // Soft Greenish Beige
            dark: '#50c878',    // Muted Olive
            contrastText: '#333333',  // Dark text for readability
          },
          background:{
              
        },
        info:{
            main: '#98FF98',    // Soft Greenish Beige
            dark: '#98FF98',    // Muted Olive
            contrastText: '#333333',  // Dark text for readability
        },

    },
    typography: {
      fontSize: 14, // Default font size
      h6: {
        fontSize: '1.25rem', // Heading size on larger screens
      },
      body1: {
        fontWeight: 500, // For body text
      },
    },
  });


export default demoTheme;