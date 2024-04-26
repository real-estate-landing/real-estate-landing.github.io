import Logo from "../../assets/images/logo.png";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Paper,
  Slide,
  SwipeableDrawer,
  Zoom,
} from "@mui/material";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import { makeStyles } from "../../styles";
import React, { useState } from "react";
import RippleLink from "../../base_components/RippleLink";
import Flag from "./components/Flag";
import { useContact } from "../../contexts/contact";
import { useSettings } from "../../contexts/setting-context";
import { useLocation, useNavigate } from "react-router";

const useStyles = makeStyles()((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
  navbar: {
    position: "sticky",
    top: "0",
    zIndex: "100",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: theme.palette.background.default,
    [theme.breakpoints.up("laptop")]: {
      padding: "10px 30px",
    },
    [theme.breakpoints.down("laptop")]: {
      padding: "10px",
    },
  },
  nav_ul: {
    display: "none",
    [theme.breakpoints.up("laptop")]: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
  },
  nav_set: {
    display: "none",
    [theme.breakpoints.up("laptop")]: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      border: "none",
      boxShadow: "none",
      background: "transparent",
    },
  },
  menu_btn: {
    display: "none",
    [theme.breakpoints.down("laptop")]: {
      display: "block",
      width: "50px",
      aspectRatio: "1/1",
    },
  },
  lang_link: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    width: "100%",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "none",
    width: "260px",
    border: "none",
    padding: "10px",
    gap: "10px",
  },
  logo_pack: {
    display: "flex",
    gap: "5px",
    marginBottom: "10px",
  },
  text_wrap: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
  primary_text: {
    color: theme.palette.text.secondary,
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
  // logoAnimation: {
  //   animationName:`${theme}`
  // }
}));
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const contactContext = useContact();
  const settings = useSettings();
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation();
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [sidebar, setSidebar] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function toggleDrawer(status: boolean) {
    setSidebar(status);
  }

  return (
    <React.Fragment>
      <div className={classes.navbar}>
        <Slide direction="right" in={!!contactContext?.state.lng}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {location.pathname == "/terms" || location.pathname == "/policy" ? (
              <IconButton onClick={() => navigate("/")}>
                <ArrowBackIcon />
              </IconButton>
            ) : null}
            <img src={Logo} alt="logo" loading="lazy" />
          </Box>
        </Slide>
        <ul className={classes.nav_ul}>
          <Zoom
            in={!!contactContext?.state.lng}
            style={{
              transitionDelay: contactContext?.state.lng ? "200ms" : "0ms",
            }}
          >
            <li>
              <RippleLink
                href="solutions"
                text={contactContext?.state.lng && t("h_tab1")}
              />
            </li>
          </Zoom>
          <Zoom
            in={!!contactContext?.state.lng}
            style={{
              transitionDelay: contactContext?.state.lng ? "300ms" : "0ms",
            }}
          >
            <li>
              <RippleLink
                href="reviews"
                text={contactContext?.state.lng && t("h_tab2")}
              />
            </li>
          </Zoom>
          <Zoom
            in={!!contactContext?.state.lng}
            style={{
              transitionDelay: contactContext?.state.lng ? "400ms" : "0ms",
            }}
          >
            <li>
              <RippleLink
                href="faq"
                text={contactContext?.state.lng && t("h_tab3")}
              />
            </li>
          </Zoom>
          <Zoom
            in={!!contactContext?.state.lng}
            style={{
              transitionDelay: contactContext?.state.lng ? "500ms" : "0ms",
            }}
          >
            <li>
              <RippleLink
                href="contact"
                text={contactContext?.state.lng && t("h_tab4")}
              />
            </li>
          </Zoom>
          <Zoom
            in={!!contactContext?.state.lng}
            style={{
              transitionDelay: contactContext?.state.lng ? "500ms" : "0ms",
            }}
          >
            <li>
              <RippleLink href="tel:+998977773419" text={""} link>
                <a href="tel:+998977773419">+998977773419</a>
              </RippleLink>
            </li>
          </Zoom>
        </ul>
        <Paper className={classes.nav_set}>
          <Zoom
            in={!!contactContext?.state.lng}
            style={{
              transitionDelay: contactContext?.state.lng ? "600ms" : "0ms",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              aria-label="order crm"
              onClick={() => contactContext?.actions.openModal()}
            >
              {contactContext?.state.lng && t("order_crm")}
            </Button>
          </Zoom>
          <Zoom
            in={!!contactContext?.state.lng}
            style={{
              transitionDelay: contactContext?.state.lng ? "700ms" : "0ms",
            }}
          >
            <div
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <RippleLink
                href="#"
                text={contactContext?.state.lng && t(language)}
                menu
              >
                <GTranslateIcon />
              </RippleLink>
            </div>
          </Zoom>
        </Paper>
        <Slide direction="left" in={!!contactContext?.state.lng}>
          <IconButton
            className={classes.menu_btn}
            onClick={() => toggleDrawer(true)}
            aria-label="menu button"
          >
            <MenuIcon />
          </IconButton>
        </Slide>
      </div>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            marginTop: "20px",

            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            settings.saveSettings({ language: "uz" });
            changeLanguage("uz");
          }}
          className={classes.lang_link}
        >
          <Flag lang="uz" /> {contactContext?.state.lng && t("uz")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            settings.saveSettings({ language: "ru" });
            changeLanguage("ru");
          }}
          className={classes.lang_link}
        >
          <Flag lang="ru" /> {contactContext?.state.lng && t("ru")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            settings.saveSettings({ language: "uz-Cyrl-UZ" });
            changeLanguage("uz-Cyrl-UZ");
          }}
          className={classes.lang_link}
        >
          <Flag lang="uz" /> {contactContext?.state.lng && t("uz-Cyrl-UZ")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            settings.saveSettings({ language: "en" });
            changeLanguage("en");
          }}
          className={classes.lang_link}
        >
          <Flag lang="en" /> {contactContext?.state.lng && t("en")}
        </MenuItem>
      </Menu>
      <SwipeableDrawer
        anchor={"right"}
        open={sidebar}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <Paper className={classes.sidebar}>
          <div className={classes.logo_pack}>
            <img src={Logo} alt="logo" loading="lazy" />
            <div className={classes.text_wrap}>
              <span className={classes.primary_text}>Real</span>
              <span className={classes.secondary_text}>Estate</span>
            </div>
          </div>
          <Divider />
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
              maxWidth: "400px",
              marginBottom: "10px",
            }}
          >
            <ListItem
              key={0}
              disablePadding
              sx={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <RippleLink
                href="solutions"
                text={contactContext?.state.lng && t("h_tab1")}
                mode="full"
              />
            </ListItem>
            <ListItem
              key={1}
              disablePadding
              sx={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <RippleLink
                href="reviews"
                text={contactContext?.state.lng && t("h_tab2")}
                mode="full"
              />
            </ListItem>
            <ListItem
              key={2}
              disablePadding
              sx={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <RippleLink
                href="faq"
                text={contactContext?.state.lng && t("h_tab3")}
                mode="full"
              />
            </ListItem>
            <ListItem
              key={3}
              disablePadding
              sx={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <RippleLink
                href="contact"
                text={contactContext?.state.lng && t("h_tab4")}
                mode="full"
              />
            </ListItem>
            <ListItem
              key={3}
              disablePadding
              sx={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <RippleLink href="" text={""} mode="full" link>
                <a href="tel:+998977773419">+998977773419</a>
              </RippleLink>
            </ListItem>
          </List>
          <Divider />
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              maxWidth: "400px",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            <ListItem
              key={0}
              disablePadding
              sx={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => contactContext?.actions.openModal()}
                sx={{ width: "100%" }}
                aria-label="order crm"
              >
                {contactContext?.state.lng && t("order_crm")}
              </Button>
            </ListItem>
            <ListItem
              key={1}
              disablePadding
              sx={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <RippleLink
                  href="#"
                  text={contactContext?.state.lng && t(language)}
                  menu
                  mode="full"
                >
                  <GTranslateIcon />
                </RippleLink>
              </div>
            </ListItem>
          </List>
        </Paper>
      </SwipeableDrawer>
    </React.Fragment>
  );
}
