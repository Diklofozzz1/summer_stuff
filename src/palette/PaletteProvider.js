import React, {createContext} from "react";
import {DarkPalette} from "./DarkPalette";
import {LightPalette} from "./LightPalette";

export const PaletteProvider = createContext(LightPalette);
