import Header from "../components/header/header";
import Main from "../components/main/main";
import Footer from "../components/footer/footer";
import ContactModal from "../base_components/ContactModal";
import { useSettings } from "../contexts/setting-context";
import { createCustomTheme } from "../theme/userTheme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ContactProvider from "../contexts/contact";
import { initializeI18n } from "../i18n";
import { useEffect, useState } from "react";

function MainPage() {
  const { settings } = useSettings();
  const [componentProvider, setComponentProvider] =
    useState<React.ReactElement>();
  useEffect(() => {
    initializeI18n(settings.language);
    setComponentProvider(
      <>
        <Header />
        <Main />
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
