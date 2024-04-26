import { makeStyles } from "../styles";
import { Button } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import React, { MutableRefObject } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link as ScrollLink } from "react-scroll";

type Props = {
  text?: string;
  href: string;
  children?: React.ReactNode;
  menu?: boolean;
  mode?: "full" | "auto";
  link?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const useStyles = makeStyles()((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
  nav_li: {
    position: "relative",
    borderRadius: "6px",
    backgroundColor: theme.palette.secondary.main,
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    color: theme.palette.text.primary,
    transition: "200ms ease",
    whiteSpace: "nowrap",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  b_elems: {
    marginLeft: "4px",
  },
  nav_li_active: {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

function RippleLink({ text, href, children, menu, mode, link }: Props) {
  const { classes } = useStyles();
  const rippleRef: MutableRefObject<null | {
    start: Function;
    stop: Function;
  }> = React.useRef(null);
  const onRippleStart = (e: any) => {
    const currentRipple = rippleRef.current;
    if (currentRipple) {
      currentRipple.start(e);
    }
  };

  const onRippleStop = (e: any) => {
    const currentRipple = rippleRef.current;
    if (currentRipple) {
      currentRipple.stop(e);
    }
  };
  return (
    <>
      {!menu && !link ? (
        <ScrollLink
          to={href}
          activeClass={classes.nav_li_active}
          className={classes.nav_li}
          onMouseDown={onRippleStart}
          onMouseUp={onRippleStop}
          spy={true}
          smooth={true}
          offset={-60}
          duration={500}
          style={mode === "full" ? { width: "100%" } : { width: "auto" }}
        >
          <span className={classes.b_elems}>{children}</span>
          <span className={classes.b_elems}>{text}</span>
          <span className={classes.b_elems}>
            {menu && <ArrowDropDownIcon />}
          </span>
          <TouchRipple ref={rippleRef} center={false} />
        </ScrollLink>
      ) : link ? (
        <>
          <div className={classes.nav_li}>{children}</div>
          <TouchRipple ref={rippleRef} center={false} />
        </>
      ) : (
        <Button
          style={mode === "full" ? { width: "100%" } : { width: "auto" }}
          className={classes.nav_li}
          onMouseDown={onRippleStart}
          onMouseUp={onRippleStop}
        >
          <span className={classes.b_elems}>{children}</span>
          <span className={classes.b_elems}>{text}</span>
          <span className={classes.b_elems}>
            {menu && <ArrowDropDownIcon />}
          </span>
          <TouchRipple ref={rippleRef} center={false} />
        </Button>
      )}
    </>
  );
}

export default RippleLink;
