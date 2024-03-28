import Logo from "../../assets/images/logo.png";
import telegram from "../../assets/images/telegram.png";
import instagram from "../../assets/images/instagram.png";
import facebook from "../../assets/images/Facebook.png";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";

import styles from "./footer.module.css";
import { Button, Slide, Zoom } from "@mui/material";
import { useTranslation } from "react-i18next";
import { makeStyles } from "../../styles";
import RippleLink from "../../base_components/RippleLink";
import { useContact } from "../../contexts/contact";
import clsx from "clsx";
import { Element } from "react-scroll";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
  navbar: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: theme.palette.background.default,
    padding: "10px 30px 10px 30px",
  },
  nav_ul: {
    marginTop: "0.5rem",
    display: "flex",
    // flexWrap: "wrap",
    gap: "16px",
    [theme.breakpoints.down("desktop")]: {
      display: "none",
    },
  },
  lang_link: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    width: "100%",
  },
  logo_pack: {
    display: "flex",
    gap: "5px",
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
  contact_text: {
    fontSize: "14px",
    fontWeight: "600",
  },
}));

export default function Footer() {
  const contactContext = useContact();
  const { ref: footerRef, inView: isFooterRefVisible } = useInView();
  const { t } = useTranslation();
  const { classes } = useStyles();
  return (
    <Element name="contact" style={{ overflow: "hidden" }}>
      <footer
        className="bg-[#DEE8FF] px-[10px] min-[1050px]:px-[30px] rounded-[12px] pb-4"
        ref={footerRef}
      >
        <div className="h-full flex justify-between gap-4 py-6 max-[650px]:flex-col">
          <div className="flex flex-col gap-2 min-w-[210px] max-w-[415px]">
            <Slide
              direction="right"
              in={isFooterRefVisible}
              style={{ transitionDelay: "300ms" }}
            >
              <div className={classes.logo_pack}>
                <img src={Logo} alt="logo" loading="lazy" />
                <div className={classes.text_wrap}>
                  <span className={classes.primary_text}>Real</span>
                  <span className={classes.secondary_text}>Estate</span>
                </div>
              </div>
            </Slide>
            <Slide
              direction="right"
              in={isFooterRefVisible}
              style={{ transitionDelay: "400ms" }}
            >
              <span className={classes.contact_text}>
                <a href="tel:+998977773419">
                  <CallIcon fontSize="small" /> +998977773419
                </a>
              </span>
            </Slide>
            <Slide
              direction="right"
              in={isFooterRefVisible}
              style={{ transitionDelay: "500ms" }}
            >
              <span className={classes.contact_text}>
                <a href="mailto:support@itkey.uz">
                  <EmailIcon fontSize="small" /> @itkeysofttech
                </a>
              </span>
            </Slide>
            <Slide
              direction="right"
              in={isFooterRefVisible}
              style={{ transitionDelay: "600ms" }}
            >
              <span className={classes.contact_text}>
                <PlaceIcon fontSize="small" />{" "}
                {contactContext?.state.lng && t("address")}
              </span>
            </Slide>
            <Slide
              direction="right"
              in={isFooterRefVisible}
              style={{ transitionDelay: "700ms" }}
            >
              <Link
                to="/policy"
                className={clsx(styles.footerLink, "mt-5 max-[650px]:hidden")}
              >
                ©{new Date().getFullYear()}{" "}
                {contactContext?.state.lng && t("copyright")}
              </Link>
            </Slide>
          </div>
          <ul className={classes.nav_ul}>
            <Zoom
              in={isFooterRefVisible}
              style={{
                transitionDelay: isFooterRefVisible ? "400ms" : "0ms",
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
              in={isFooterRefVisible}
              style={{
                transitionDelay: isFooterRefVisible ? "500ms" : "0ms",
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
              in={isFooterRefVisible}
              style={{
                transitionDelay: isFooterRefVisible ? "600ms" : "0ms",
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
              in={isFooterRefVisible}
              style={{
                transitionDelay: isFooterRefVisible ? "700ms" : "0ms",
              }}
            >
              <li>
                <RippleLink
                  href="contact"
                  text={contactContext?.state.lng && t("h_tab4")}
                />
              </li>
            </Zoom>
          </ul>
          <div className="h-full">
            <div className="w-56">
              <Slide
                direction="left"
                in={isFooterRefVisible}
                style={{ transitionDelay: "300ms" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%" }}
                  onClick={contactContext?.actions.openModal}
                >
                  {contactContext?.state.lng && t("order_crm")}
                </Button>
              </Slide>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <Zoom
                in={isFooterRefVisible}
                style={{
                  transitionDelay: isFooterRefVisible ? "400ms" : "0ms",
                }}
              >
                <a href="https://t.me/realestatecrm" target="_blank">
                  <img
                    src={telegram}
                    alt="telegram social-link"
                    loading="lazy"
                  />
                </a>
              </Zoom>
              <Zoom
                in={isFooterRefVisible}
                style={{
                  transitionDelay: isFooterRefVisible ? "500ms" : "0ms",
                }}
              >
                <a
                  href="https://www.instagram.com/itkeyuzb?igsh=MTZqbGFiaDhlYXozMQ=="
                  target="_blank"
                >
                  <img
                    src={instagram}
                    alt="instagram social-link"
                    loading="lazy"
                  />
                </a>
              </Zoom>
              <Zoom
                in={isFooterRefVisible}
                style={{
                  transitionDelay: isFooterRefVisible ? "600ms" : "0ms",
                }}
              >
                <a
                  href="https://www.facebook.com/ITKEYUZ?mibextid=LQQJ4d"
                  target="_blank"
                >
                  <img
                    src={facebook}
                    alt="facebook social-link"
                    loading="lazy"
                  />
                </a>
              </Zoom>
            </div>
            <Zoom
              in={isFooterRefVisible}
              style={{
                transitionDelay: isFooterRefVisible ? "800ms" : "0ms",
              }}
            >
              <div className="flex gap-4 justify-center mt-4">
                <Link to="/terms" className={styles.footerLink}>
                  {contactContext?.state.lng && t("exl1")}
                </Link>
              </div>
            </Zoom>
          </div>
          <Slide
            direction="left"
            in={isFooterRefVisible}
            style={{ transitionDelay: "900ms" }}
          >
            <Link
              to="/policy"
              className={clsx(
                styles.footerLink,
                "mt-5 hidden max-[650px]:block decoration-[none]"
              )}
            >
              ©{new Date().getFullYear()}{" "}
              {contactContext?.state.lng && t("copyright")}
            </Link>
          </Slide>
        </div>
      </footer>
    </Element>
  );
}
