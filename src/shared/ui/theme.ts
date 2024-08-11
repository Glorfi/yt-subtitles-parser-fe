import { extendTheme } from '@chakra-ui/react';

const breakboints = {
  breakpoints: {
    base: '0px',
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const theme = extendTheme({
  breakboints,
});
