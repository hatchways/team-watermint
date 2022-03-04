import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    bookingHeader: React.CSSProperties;
    bookingBody: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    bookingHeader?: React.CSSProperties;
    bookingBody?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bookingHeader: true;
    bookingBody: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#f14140',
    },
    secondary: {
      main: '#555',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Open Sans", "sans-serif"',
    fontSize: 12,
    bookingHeader: {
      fontWeight: 'bold',
      fontSize: 13,
      textTransform: 'uppercase',
    },
    bookingBody: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  },
});
