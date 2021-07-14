import React from 'react';
import { createTheme } from '@material-ui/core/styles';

export const DarkPalette = createTheme({
    palette: {
        type: 'dark',
        background:{
            default: '#303030',
            paper: '#303030',
        },
        action:{
            active: '#ffffff',
            disabled: '#8e8e8e',
        },
        text:{
            primary:  '#a8a8a8'
        },
        primary:{
            main: '#747474'
        }
    },
});