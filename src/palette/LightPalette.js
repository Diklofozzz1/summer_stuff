import React from 'react';
import { createTheme } from '@material-ui/core/styles';

export const LightPalette = createTheme({
    palette: {
        type: 'light',
        background:{
            default: '#ffffff',
            paper: '#fafafa',
        },
        action:{
            disabled: '#8e8e8e',
        },
        text:{
            primary:  '#000000'
        },
        primary:{
            main: '#6175ad'
        }
    },
});