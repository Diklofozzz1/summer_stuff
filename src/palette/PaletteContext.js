import React, {createContext} from "react";
import {DarkPalette} from "./DarkPalette";
import {LightPalette} from "./LightPalette";

export const themes = {
    light: LightPalette,
    dark: DarkPalette
}

export const PaletteContext = createContext({
    theme: themes.light,
    toggleTheme: () => {}
});
