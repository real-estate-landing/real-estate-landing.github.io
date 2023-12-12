import imageHeaderEn from "../../../../assets/images/rieltor_en.png";
import imageHeaderRu from "../../../../assets/images/rieltor_ru.png";
import imageHeaderUz from "../../../../assets/images/rieltor_uz.png";
import imageHeaderUzCr from "../../../../assets/images/rieltor_uz_cyreal.png";

import { Button, Slide, Zoom } from "@mui/material";
import Text from "../../../../ui-components/text/Text";
import { makeStyles } from "../../../../styles";
import { useTranslation } from "react-i18next";
import { useContact } from "../../../../contexts/contact";
import { useInView } from "react-intersection-observer";

const useStyles = makeStyles()((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
  p: {
    paddingTop: "10px",
    paddingBottom: "20px",
    color: theme.palette.text.primary,
    textTransform: "capitalize",
  },
  texts: {
    width: "100%",
    maxWidth: "780px",
    minWidth: "550px",
    paddingTop: "90px",
    flex: 1,
    [theme.breakpoints.down("lg")]: {
      paddingTop: "40px",
    },
    [theme.breakpoints.down("md")]: {
      minWidth: "0px",
    },
  },
  img: {
    width: "100%",
    aspectRatio: "1/1",
    maxWidth: "700px",
    height: "auto",
    margin: "auto",
  },
  [theme.breakpoints.down("md")]: {},
}));

function MainHeader() {
  const { classes } = useStyles();
  const contactContext = useContact();
  console.log(contactContext);
  const { ref: headerRef, inView: isHeaderVisible } = useInView();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const imageHeader =
    language === "en"
      ? imageHeaderEn
      : language === "ru"
      ? imageHeaderRu
      : language === "uz"
      ? imageHeaderUz
      : imageHeaderUzCr;
  return (
    <div
      className="bg-[#F5F8FF] overflow-hidden flex flex-col flex-wrap align-middle lg:flex-row px-[10px] min-[1050px]:px-[30px]"
      ref={headerRef}
    >
      <div className={classes.texts} style={{ width: "auto" }}>
        <Zoom
          in={!!contactContext?.state.lng && isHeaderVisible}
          style={{ transitionDelay: "200ms" }}
        >
          <div>
            <Text
              primaryText={contactContext?.state.lng && t("headerPrimaryText")}
              secondaryText={
                contactContext?.state.lng && t("headerSecondaryText")
              }
            />
          </div>
        </Zoom>
        <Zoom
          in={!!contactContext?.state.lng && isHeaderVisible}
          style={{ transitionDelay: "300ms" }}
        >
          <p className={classes.p}>
            {contactContext?.state.lng && t("explanation")}
          </p>
        </Zoom>
        <Slide
          direction="right"
          in={!!contactContext?.state.lng && isHeaderVisible}
          style={{ transitionDelay: "400ms" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={contactContext?.actions.openModal}
          >
            {contactContext?.state.lng && t("try_btn")}
          </Button>
        </Slide>
      </div>
      <Zoom
        in={!!contactContext?.state.lng && isHeaderVisible}
        style={{
          transitionDelay:
            !!contactContext?.state.lng && isHeaderVisible ? "500ms" : "0ms",
        }}
      >
        <img
          src={imageHeader}
          alt="header image"
          loading="lazy"
          className={classes.img}
        />
      </Zoom>
    </div>
  );
}

export default MainHeader;
