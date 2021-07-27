import React from 'react'

import Routes from "./routes";
import {ThemeProvider} from "@material-ui/core";
import {CssBaseline} from "@material-ui/core";

import {PaletteContext} from './palette/PaletteContext';

import './App.css';

import {createTheme} from "@material-ui/core/styles";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.darkMode = false;
    }

    toggleTheme = () => {
        this.setState({
            // theme: theme
            theme: this.darkMode ? createTheme({
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
                        main: '#3f50b6'
                    }
                },
            }) :
                createTheme({
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
                            // main: '#747474'
                            main: '#3f50b6',
                        }
                    },

                })
        });

        this.darkMode = !this.darkMode;
    }

    state = {
        toggleTheme: this.toggleTheme,
    };

    render() {
        return (
            <ThemeProvider theme={this.state.theme}>
                <CssBaseline>
                    <PaletteContext.Provider value={this.state}>
                        <Routes />
                    </PaletteContext.Provider>
                </CssBaseline>
            </ThemeProvider>
        );
    }
}

