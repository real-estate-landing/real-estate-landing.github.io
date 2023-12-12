import { makeStyles } from "../../styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContact } from "../../contexts/contact";

interface Props {
  primaryText: string | undefined;
  secondaryText: string | undefined;
}

const useStyles = makeStyles()((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
  h1: {
    fontSize: "calc(25px + (33 - 25) * (100vw - 300px) / (800 - 300))",
    lineHeight: "2.8rem",
    fontWeight: "600",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("sm")]: {
      lineHeight: "2rem",
    },
  },
}));
function Text(props: Props) {
  const contactContext = useContact();
  const { classes } = useStyles();
  const isItLarge = useMediaQuery("(min-width:1300px)");
  const { primaryText, secondaryText } = props;
  return (
    <>
      <h1 className={classes.h1}>
        {!!contactContext?.state.lng && primaryText} {isItLarge ? <br /> : null}{" "}
        <span className="text-[#3F51B5]">
          {!!contactContext?.state.lng && secondaryText}
        </span>
      </h1>
    </>
  );
}

export default Text;
