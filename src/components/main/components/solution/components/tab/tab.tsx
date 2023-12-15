import {
  Box,
  IconButton,
  ListItemButton,
  Modal,
  Paper,
  Slide,
  Tabs,
  Tab as TabVal,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import styles from "./tab.module.css";
import React, { useRef } from "react";
import { makeStyles } from "../../../../../../styles";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// imgs
import firstImg from "../../../../../../assets/images/firstImg.jpg";
import secondImg from "../../../../../../assets/images/secondImg.jpg";
import thirdImg from "../../../../../../assets/images/thirdImg.jpg";
import fourthImg from "../../../../../../assets/images/fourthImg.jpg";
import fifthImg from "../../../../../../assets/images/fifthImg.jpg";
import dbPageImg from "../../../../../../assets/images/dbPage.jpg";
import dealPageImg from "../../../../../../assets/images/dealPage.jpg";
import dbAddPageImg from "../../../../../../assets/images/dbAddPage.jpg";
import tasksPageImg from "../../../../../../assets/images/tasksPage.jpg";
import requestPageImg from "../../../../../../assets/images/requestPage.jpg";
// import contactsPageImg from "../../../../../../assets/images/contactsPage.jpg";
// import dbObjectPageImg from "../../../../../../assets/images/dbObjectPage.jpg";
// import employeesPageImg from "../../../../../../assets/images/employeesPage.jpg";
// import employeeEditImg from "../../../../../../assets/images/employeeEdit.jpg";
import { useContact } from "../../../../../../contexts/contact";
import SwiperController from "./swiperController/swiperController";

interface Props {
  tabs:
    | {
        id: number;
        tabTitle: string;
        tabHeader: string;
        tabList: string;
      }[]
    | undefined;
  isSolutionRefVisible: boolean;
}
const useStyles = makeStyles()((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
  tab_table: {
    width: "100%",
    maxWidth: "900px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tabs: {
    gap: "10px",
    ".MuiTabs-indicator": {
      backgroundColor: "transparent",
    },
    ".MuiTabs-scrollButtons": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    ".MuiTabs-scrollButtons.Mui-disabled": {
      opacity: 0.3,
      backgroundColor: "#666",
    },
    ".css-heg063-MuiTabs-flexContainer": {
      gap: "10px",
    },
    ".mui-heg063-MuiTabs-flexContainer": {
      gap: "10px",
    },
    borderRadius: "6px",
  },
  tab: {
    gap: "10px",
    backgroundColor: "white",
    borderRadius: "6px",
    color: "black",

    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  paper: {
    position: "absolute",
    top: "40px",
    transform: "translateX(-150%)",
    transition: "200ms ease",
    borderRadius: "10px",
    backgroundColor: theme.palette.primary.main,
    zIndex: 99,
    padding: "16px",

    [theme.breakpoints.up("mid")]: {
      display: "none",
    },
  },
  paperOpen: {
    position: "absolute",
    top: "40px",
    transform: "translateX(-20px)",
    transition: "200ms ease",
    borderRadius: "10px",
    backgroundColor: theme.palette.primary.main,
    zIndex: 99,
    padding: "16px",
    [theme.breakpoints.up("mid")]: {
      display: "none",
    },
  },
  swiperImg: {
    boxSizing: "border-box",
    position: "absolute",
    margin: "auto",
    top: "2px",
    right: "2px",
    left: "2px",
    bottom: "2px",
    aspectRatio: "1/1",
    width: "97%",
    objectFit: "cover",
    objectPosition: "left top",
  },
  swiper_btn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "rgba(0,0,0,0.25)",
    transition: "200ms ease",
    color: "white",

    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.45)",
    },
  },
  fullImg: {
    height: "auto",
    width: "100%",
    margin: "auto",
  },
  listItemButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
    width: "12%",
    minWidth: "80px",
    borderRadius: "0px",
    transition: "200ms",
    backgroundColor: "rgba(0,0,0,0.08)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.35)",
    },
  },
}));

function Tab({ tabs, isSolutionRefVisible }: Props) {
  const contactContext = useContact();
  const { classes } = useStyles();
  const [value, setValue] = React.useState(0);
  const [toggle, setToogle] = React.useState(false);
  const swiperRef = useRef<SwiperRef>(null);
  const swiperImgs = [
    firstImg,
    secondImg,
    thirdImg,
    fourthImg,
    fifthImg,
    dbPageImg,
    dealPageImg,
    dbAddPageImg,
    tasksPageImg,
    requestPageImg,
  ];
  const colors = [
    "bg-blue-900",
    "bg-blue-700",
    "bg-blue-600",
    "bg-blue-500",
    "bg-blue-400",
    "bg-blue-300",
    "bg-blue-200",
    "bg-blue-100",
    "bg-gray-50",
  ];
  const [swiperImgFull, setSwiperImgFull] = React.useState<{
    open: boolean;
    img: number;
  }>({ open: false, img: 0 });
  const isItLarge = useMediaQuery("(min-width:750px)");
  function toggleLists() {
    setToogle((pre) => !pre);
  }
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function handleCloseImgFull() {
    setSwiperImgFull((pre) => {
      return { ...pre, open: false };
    });
  }
  const filteredTabs = tabs?.[value];

  const lists = filteredTabs?.tabList?.split(";").map((list, i) => {
    return (
      <Zoom
        in={!!contactContext?.state.lng && isSolutionRefVisible}
        style={{
          transitionDelay:
            !!contactContext?.state.lng && isSolutionRefVisible
              ? `${500 + i * 100}ms`
              : "0ms",
        }}
      >
        <li
          key={i}
          className={"bg-white my-2 rounded-[8px] p-2 relative " + styles.link}
        >
          {list}
        </li>
      </Zoom>
    );
  });

  const titles = tabs?.map((tab, i) => {
    return (
      <Slide
        direction="down"
        in={!!contactContext?.state.lng && isSolutionRefVisible}
        style={{
          transitionDelay:
            !!contactContext?.state.lng && isSolutionRefVisible
              ? `${300 + i * 100}ms`
              : "0ms",
        }}
      >
        <TabVal className={classes.tab} label={tab.tabTitle} key={i + "tab"} />
      </Slide>
    );
  });

  console.log(swiperImgs);
  return (
    <>
      <div key={value} className={classes.tab_table}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            className={classes.tabs}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            {titles}
          </Tabs>
        </Box>
        <div className="flex gap-6 mt-6">
          <div className="bg-[#3F51B5] rounded-[10px] p-4 flex-[1] min-[750px]:block hidden">
            <Slide
              direction="right"
              in={!!contactContext?.state.lng && isSolutionRefVisible}
              style={{
                transitionDelay:
                  !!contactContext?.state.lng && isSolutionRefVisible
                    ? `${900}ms`
                    : "0ms",
              }}
            >
              <h2 className="text-white">
                {filteredTabs && filteredTabs.tabHeader}
              </h2>
            </Slide>
            <ul>{lists}</ul>
          </div>
          <div className="min-[750px]:flex-[2] w-full bg-[#3F51B5] rounded-[10px] relative flex align-middle p-6 min-[750px]:pt-6 pt-10">
            {!isItLarge && (
              <IconButton
                aria-label="close"
                onClick={toggleLists}
                sx={{
                  position: "absolute",
                  left: 5,
                  top: 5,
                  color: "white",
                }}
                className=" min-[750px]:hidden"
              >
                {toggle ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
            <Paper className={toggle ? classes.paperOpen : classes.paper}>
              <h2 className="text-white">
                {filteredTabs && filteredTabs.tabHeader}
              </h2>
              <ul>{lists}</ul>
            </Paper>

            <Swiper
              effect={"cards"}
              grabCursor={true}
              ref={swiperRef}
              modules={[EffectCards, Navigation, Pagination]}
              className="min-[500px]:max-w-[360px] w-full aspect-square border-0 flex items-center justify-center"
            >
              {swiperImgs.map((item, index) => (
                <SwiperSlide
                  key={index + ":swiper"}
                  className={`h-full w-full m-0 border-0 text-center flex items-center justify-center text-white font-bold ${colors[index]}`}
                >
                  <img
                    src={item}
                    alt="firstImg"
                    className={classes.swiperImg}
                    style={index === 2 ? { objectPosition: "center" } : null}
                    loading="lazy"
                  />
                  <IconButton
                    className={classes.swiper_btn}
                    onClick={() => setSwiperImgFull({ open: true, img: index })}
                  >
                    <OpenInFullIcon />
                  </IconButton>
                </SwiperSlide>
              ))}
              <SwiperController value={value} />
            </Swiper>
          </div>
        </div>
      </div>
      <Modal
        open={swiperImgFull.open}
        onClose={handleCloseImgFull}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <>
          <IconButton
            className={classes.swiper_btn}
            onClick={handleCloseImgFull}
          >
            <CloseFullscreenIcon />
          </IconButton>
          <Box
            sx={{
              height: "auto",
              width: "90%",
              margin: "auto",
              position: "relative",
            }}
          >
            <img
              src={swiperImgs[swiperImgFull.img]}
              alt="fullImg"
              className={classes.fullImg}
              loading="lazy"
            />
            <ListItemButton
              disabled={swiperImgFull.img <= 0}
              className={classes.listItemButton}
              sx={{ left: 0 }}
              onClick={() =>
                setSwiperImgFull((pre) => {
                  return { ...pre, img: pre.img - 1 };
                })
              }
            >
              <ArrowBackIosNewIcon />
            </ListItemButton>
            <ListItemButton
              disabled={swiperImgFull.img >= swiperImgs.length - 1}
              className={classes.listItemButton}
              sx={{ right: 0 }}
              onClick={() =>
                setSwiperImgFull((pre) => {
                  return { ...pre, img: pre.img + 1 };
                })
              }
            >
              <ArrowForwardIosIcon />
            </ListItemButton>
          </Box>
        </>
      </Modal>
    </>
  );
}

export default Tab;
