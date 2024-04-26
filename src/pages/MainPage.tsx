import routes from "./user/routes";
import { useSettings } from "../contexts/setting-context";
import { createCustomTheme } from "../theme/userTheme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ContactProvider from "../contexts/contact";
import { initializeI18n } from "../i18n";
import { useRoutes } from "react-router";
import QuickContact from "../components/QuickContact";

function MainPage() {
  const content = useRoutes(routes);
  const { settings } = useSettings();

  initializeI18n(settings.language);

  const theme = createCustomTheme({
    direction: settings.direction,
    theme: settings.theme,
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <ContactProvider lng={settings.language}>
          <CssBaseline />
          {settings && content}
        </ContactProvider>
      </ThemeProvider>
    </>
  );
}

export default MainPage;
