import { useContact } from "../contexts/contact";
import { makeStyles } from "../styles";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const useStyles = makeStyles()((theme) => ({
  quickContact: {
    position: "fixed",
    bottom: "100px",
    right: "100px",
    zIndex: 100,
  },
  wrap: {
    position: "absolute",
    margin: "0 auto",
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "60px",
    width: "60px",
  },
  button: {
    background: theme.palette.primary.main,
    cursor: "pointer",
    border: `2px solid ${theme.palette.primary.main}`,
    color: "white",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: "50%",
    textTransform: "uppercase",
    fontFamily: '"Muli-LightItalic", Helvetica',
    fontSize: "35px",
    animation: `${theme.keyframesList.ripple} 1.5s linear infinite`,
    transition: "all 0.7s ease",

    "&:hover": {
      transform: "scale(1.1)",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));
function QuickContact() {
  const { actions } = useContact();
  const { classes } = useStyles();
  return (
    <div className={classes.quickContact}>
      <div className={classes.wrap}>
        <button onClick={() => actions.openModal()} className={classes.button}>
          <LocalPhoneIcon sx={{ fontSize: "30px" }} />
        </button>
      </div>
    </div>
  );
}

export default QuickContact;
