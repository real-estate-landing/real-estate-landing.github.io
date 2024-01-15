import routes from "./user/routes";
import { useSettings } from "../contexts/setting-context";
import { createCustomTheme } from "../theme/userTheme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ContactProvider from "../contexts/contact";
import { initializeI18n } from "../i18n";
import { useEffect, useState } from "react";
import { useRoutes } from "react-router";
import ContactModal from "../base_components/ContactModal";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

function MainPage() {
  const content = useRoutes(routes);
  const { settings } = useSettings();
  const [componentProvider, setComponentProvider] =
    useState<React.ReactElement>();

  useEffect(() => {
    initializeI18n(settings.language);
    setComponentProvider(
      <>
        <Header />
        {content}
        <Footer />
        <ContactModal />
      </>
    );
  }, [settings]);

  const theme = createCustomTheme({
    direction: settings.direction,
    theme: settings.theme,
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <ContactProvider lng={settings.language}>
          <CssBaseline />
          {settings && componentProvider}
        </ContactProvider>
      </ThemeProvider>
    </>
  );
}

export default MainPage;
