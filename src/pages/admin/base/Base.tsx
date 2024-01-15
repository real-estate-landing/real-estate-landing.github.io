import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Paper, Tooltip, useMediaQuery } from "@mui/material";
import { useSettings } from "../../../contexts/setting-context";
import { makeStyles } from "../../../styles";
import LogoWhite from "../../../assets/images/logoWhite.png";
import LogoBlack from "../../../assets/images/logo.png";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import toast from "react-hot-toast";
import { LanguagePopover } from "../../../components/languagePopover";
import { supportedLanguages } from "../../../types/supportedLanguages";
import { NavLink, useLocation } from "react-router-dom";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FlagIcon from "@mui/icons-material/Flag";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { routeMethods } from "../../../routes";

const drawerWidth = 250;

const useStyles = makeStyles()((theme) => ({
  logo_pack: {
    display: "flex",
    gap: "5px",
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "none",
  },
  text_wrap: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
  primary_text: {
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: "1.2rem",
  },
  secondary_text: {
    color: theme.palette.text.primary,
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: "1.2rem",
  },
  toolbar_light: {
    backgroundColor: theme.palette.background.default,
  },
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type Props = {
  children?: React.ReactNode;
};

function Base({ children }: Props) {
  const location = useLocation();

  const theme = useTheme();
  const { saveSettings, settings } = useSettings();
  const [lightMode, setLightMode] = useState(settings.theme === "light");
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const { classes } = useStyles();
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [open, setOpen] = React.useState(!isMobile);

  const handleLanguageChange = (language: supportedLanguages): void => {
    changeLanguage(language);
    saveSettings({
      ...settings,
      language,
    });
    toast.success(t("Language changed"));
  };

  const handleSwitchTheme = (): void => {
    saveSettings({
      ...settings,
      theme: settings.theme === "light" ? "dark" : "light",
    });

    setLightMode(settings.theme === "light");
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className={classes.toolbar_light}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{ color: theme.palette.text.secondary }} />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "transparent",
            }}
          >
            <Paper className={classes.logo_pack}>
              <img
                src={settings.theme === "light" ? LogoBlack : LogoWhite}
                alt="logo"
                loading="lazy"
              />
              <Box className={classes.text_wrap}>
                <Typography className={classes.primary_text}>Real</Typography>
                <Typography className={classes.secondary_text}>
                  Estate
                </Typography>
              </Box>
            </Paper>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <IconButton color="inherit" onClick={handleSwitchTheme}>
                {lightMode ? (
                  <LightModeIcon sx={{ color: theme.palette.text.secondary }} />
                ) : (
                  <DarkModeIcon sx={{ color: theme.palette.text.secondary }} />
                )}
              </IconButton>

              <LanguagePopover
                language={language}
                onLanguageChange={handleLanguageChange}
                sx={{
                  display: {
                    md: "inline-flex",
                    xs: "none",
                  },
                }}
              />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box sx={{ height: "100%" }}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon
                  sx={{ color: theme.palette.text.secondary }}
                />
              ) : (
                <ChevronLeftIcon sx={{ color: theme.palette.text.secondary }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              { text: t("sidebarBr1Title1"), url: "/" },
              { text: t("sidebarBr1Title2"), url: "/freeTrialUsers" },
              { text: t("sidebarBr1Title3"), url: "/purchasedUsers" },
              { text: t("sidebarBr1Title4"), url: "/wantToTrySoonUsers" },
            ].map((text, index) => (
              <Tooltip
                key={index}
                title={text.text}
                placement="right"
                arrow
                sx={{ fontSize: "20px" }}
              >
                <NavLink
                  to={text.url}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ListItem
                    key={text.text}
                    disablePadding
                    sx={{
                      display: "block",
                      backgroundColor:
                        location.pathname === text.url
                          ? theme.palette.primary.main
                          : "",
                      color:
                        location.pathname === text.url
                          ? "#fff"
                          : theme.palette.text.primary,
                    }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color: location.pathname === text.url ? "#fff" : "",
                        }}
                      >
                        {index === 0 ? (
                          <InboxIcon />
                        ) : index === 1 ? (
                          <MoreTimeIcon />
                        ) : index === 2 ? (
                          <LocalMallIcon />
                        ) : (
                          <FlagIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text.text}
                        sx={{
                          opacity: open ? 1 : 0,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              </Tooltip>
            ))}
          </List>
          <Divider />
          <List>
            {[
              { text: t("sidebarBr2Title1"), url: "/subscribers" },
              // { text: t("sidebarBr2Title2"), url: "/blockedSubscribers" },
              // { text: t("sidebarBr2Title3"), url: "/sendEmail" },
              // { text: t("sidebarBr2Title4"), url: "/emailsHistory" },
            ].map((text, index) => (
              <Tooltip
                key={index}
                title={text.text}
                placement="right"
                arrow
                sx={{ fontSize: "20px" }}
              >
                <NavLink
                  to={text.url}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ListItem
                    key={text.text}
                    disablePadding
                    sx={{
                      display: "block",
                      backgroundColor:
                        location.pathname === text.url
                          ? theme.palette.primary.main
                          : "",
                      color:
                        location.pathname === text.url
                          ? "#fff"
                          : theme.palette.text.primary,
                    }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color: location.pathname === text.url ? "#fff" : "",
                        }}
                      >
                        <MailIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={text.text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              </Tooltip>
            ))}
          </List>
          <Divider />
          <List
            sx={{
              display: "none",
              [theme.breakpoints.down("md")]: {
                display: "block",
              },
            }}
          >
            <LanguagePopover
              language={language}
              onLanguageChange={handleLanguageChange}
              sidebarOpen={open}
              positionSidebar
              sx={{
                width: "100%",
              }}
            />
          </List>
        </Box>
        <Box>
          <Divider />
          <List>
            {[{ text: t("sidebarBr1Title5"), url: "/" }].map((text, index) => (
              <Tooltip
                key={index}
                title={text.text}
                placement="right"
                arrow
                sx={{ fontSize: "20px" }}
              >
                <NavLink
                  to={text.url}
                  style={{
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    const customWindow: routeMethods =
                      window as unknown as routeMethods;
                    customWindow.openUserPanel();
                  }}
                >
                  <ListItem
                    key={text.text}
                    disablePadding
                    sx={{
                      display: "block",
                      color:
                        location.pathname === text.url
                          ? theme.palette.text.primary
                          : "#fff",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index === 0 ? <ExitToAppIcon /> : <FlagIcon />}
                      </ListItemIcon>
                      <ListItemText
                        primary={text.text}
                        sx={{
                          opacity: open ? 1 : 0,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              </Tooltip>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "hidden" }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

export default Base;
