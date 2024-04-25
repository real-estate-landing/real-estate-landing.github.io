import {
  Direction,
  Theme,
  ThemeOptions,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import {
  darkError,
  darkInfo,
  darkPrimary,
  darkSecondary,
  darkSuccess,
  darkText,
  darkWarning,
  lightError,
  lightInfo,
  lightPrimary,
  lightSecondary,
  lightSuccess,
  lightText,
  lightWarning,
} from "./colors";
import keyframesList from "./keyframesList";

interface ThemeConfig {
  direction?: Direction;
  theme?: string;
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    mid: true;
    lg: true;
    xl: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }

  interface Theme {
    keyframesList: typeof keyframesList;
  }
  // eslint-disable-next-line no-unused-vars
  interface ThemeOptions {
    keyframesList?: typeof keyframesList;
  }
}
interface ExtendedThemeOptions extends ThemeOptions {
  keyframesList: typeof keyframesList;
}
const extendedBaseThemeOptions: ExtendedThemeOptions = {
  keyframesList,
};
const baseThemeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      mid: 750,
      lg: 1200,
      xl: 1536,
      tablet: 640,
      laptop: 1050,
      desktop: 1100,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 6px 0px rgba(63, 81, 181, 0.25)",
        },
      },
    },
  },
};

const lightThemeOptions: ThemeOptions = {
  components: {},
  palette: {
    primary: lightPrimary,
    secondary: lightSecondary,
    success: lightSuccess,
    warning: lightWarning,
    info: lightInfo,
    error: lightError,
    text: lightText,
  },
};

const darkThemeOptions: ThemeOptions = {
  components: {},
  palette: {
    primary: darkPrimary,
    secondary: darkSecondary,
    success: darkSuccess,
    warning: darkWarning,
    info: darkInfo,
    error: darkError,
    text: darkText,
  },
};

export const createCustomTheme = (config: ThemeConfig = {}): Theme => {
  let themeOptions =
    config.theme === "light" ? lightThemeOptions : darkThemeOptions;

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    themeOptions = lightThemeOptions;
  }

  const theme = responsiveFontSizes(
    createTheme(
      { ...baseThemeOptions },
      { ...extendedBaseThemeOptions },
      { ...themeOptions },
      {
        direction: config.direction,
      }
    )
  );

  return theme;
};
