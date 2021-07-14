import React, {useMemo} from 'react'

import Routes from "./routes";

import {DarkPalette} from "./palette/DarkPalette";
import {ThemeProvider} from "@material-ui/core";
import {CssBaseline} from "@material-ui/core";
import {LightPalette} from "./palette/LightPalette";

import './App.css';

export default function App() {
  // const theme = useMemo(()=>{isDark})
  return (
      <ThemeProvider theme={LightPalette}>
        <CssBaseline>
          <Routes />
        </CssBaseline>
      </ThemeProvider>
  );
}

