// color design tokens export  || Not my personal colours, need rework
export const colorTokens = {
    grey: {
      0: "#FFFFFF",
      10: "#F6F6F6",
      50: "#F0F0F0",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#4D4D4D",
      700: "#333333",
      800: "#1A1A1A",
      900: "#0A0A0A",
      1000: "#000000",
    },
    primary: {
      50: "#f3e9f9",
      100: "#e7d3f2",
      200: "#cfa8e5",
      300: "#b67cd8",
      400: "#aa66d2",
      500: "#9e51cb",
      600: "#923bc5",
      700: "#7921ab",
      800: "#5e1a85",
      900: "#360f4c",
    },
  };

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark') ? {
                // Dark mode
                primary: {
                    dark: colorTokens.primary[200],
                    main: colorTokens.primary[500],
                    light: colorTokens.primary[800]
                },
                neutral: {
                    dark: colorTokens.grey[100],
                    main: colorTokens.grey[200],
                    mediumMain: colorTokens.grey[300],
                    medium: colorTokens.grey[400],
                    light: colorTokens.grey[700]
                },
                background: {
                    dark: colorTokens.grey[900],
                    alt: colorTokens.grey[800]
                }
            } : {
                // Light mode
                primary: {
                    dark: colorTokens.primary[700],
                    main: colorTokens.primary[500],
                    light: colorTokens.primary[50]
                },
                neutral: {
                    dark: colorTokens.grey[700],
                    main: colorTokens.grey[500],
                    mediumMain: colorTokens.grey[400],
                    medium: colorTokens.grey[300],
                    light: colorTokens.grey[50]
                },
                background: {
                    dark: colorTokens.grey[10],
                    alt: colorTokens.grey[0]
                }
            }
        }
    }
}