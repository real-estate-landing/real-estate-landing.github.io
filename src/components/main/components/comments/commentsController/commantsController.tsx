import { makeStyles } from "../../../../../styles";
import { useSwiper } from "swiper/react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type Props = {
  isBeginning: boolean;
  isEnding: boolean;
};
const useStyles = makeStyles()(() => ({
  controller: {
    height: "100%",
  },
  btn: {
    position: "absolute",
    margin: "auto",
    top: 0,
    bottom: 0,
    zIndex: 5,
    color: "#fff",
    backgroundColor: "#3F51B5",
    height: "50px",
    width: "50px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "400ms ease",
  },
  btn_left: {
    position: "absolute",
    left: "0px",
    opacity: 0.6,
    "&:hover": {
      opacity: 1,
      border: "1px solid #fff",
    },
    "&:disabled": {
      opacity: 0.6,
    },
  },
  btn_right: {
    position: "absolute",
    right: "0px",
    opacity: 0.6,
    "&:hover": {
      opacity: 1,
      border: "1px solid #fff",
    },
    "&:disabled": {
      opacity: 0.6,
    },
  },
}));
function CommantsController({ isBeginning, isEnding }: Props) {
  const { classes } = useStyles();
  const swiper = useSwiper();
  return (
    <div className={classes.controller}>
      <button
        onClick={() => swiper.slidePrev()}
        className={`${classes.btn} ${classes.btn_left}`}
        disabled={isBeginning}
      >
        <KeyboardArrowLeftIcon fontSize="large" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className={`${classes.btn} ${classes.btn_right}`}
        disabled={isEnding}
      >
        <KeyboardArrowRightIcon fontSize="large" />
      </button>
    </div>
  );
}

export default CommantsController;
