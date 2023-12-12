import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { useSettings } from "../contexts/setting-context";
import { initializeI18n } from "../i18n";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { applyCustomTheme } from "../theme/adminTheme/theme";
import routes from "./admin/routes";

function AdminPage() {
  const content = useRoutes(routes);
  const { settings } = useSettings();

  useEffect(() => {
    initializeI18n(settings.language);
  }, [settings]);

  const theme = applyCustomTheme({
    direction: settings.direction,
    theme: settings.theme,
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {settings && content}
      </ThemeProvider>
    </>
  );
}

export default AdminPage;
