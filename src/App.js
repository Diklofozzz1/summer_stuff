import React from 'react'

import Routes from "./routes";
import {ThemeProvider} from "@material-ui/core";
import {CssBaseline} from "@material-ui/core";

import {PaletteContext, themes} from './palette/PaletteContext';

import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleTheme = () => {
        this.setState({
            theme: this.state.theme === themes.dark ? themes.light : themes.dark,
        });
    }

    state = {
        theme: themes.light,
        toggleTheme: this.toggleTheme,
    };

    render() {
        console.log('render')
        console.log(this.state.theme)

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

