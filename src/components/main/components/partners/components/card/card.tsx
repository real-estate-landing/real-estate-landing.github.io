import styles from "./card.module.css";
import { Box, Tooltip, Zoom } from "@mui/material";
import telegram from "../../../../../../assets/images/telegram.png";
import instagram from "../../../../../../assets/images/instagram.png";
import facebook from "../../../../../../assets/images/Facebook.png";
import CallIcon from "@mui/icons-material/Call";
import { useContact } from "../../../../../../contexts/contact";
import { makeStyles } from "../../../../../../styles";

type typeProps = {
  img: string;
  text: string;
  header: string;
  contact: {
    phoneNumber: string;
    telegramLink: string;
    instagramLink: string;
    facebookLink: string;
  };
  isSolutionRefVisible: boolean;
  index: number;
};

const useStyles = makeStyles()(() => ({
  contact_text: {
    marginTop: "16px",
    fontSize: "14px",
    fontWeight: "600",
  },
}));
export default function Card({
  img,
  text,
  header,
  isSolutionRefVisible,
  index,
  contact: { phoneNumber, telegramLink, instagramLink, facebookLink },
}: typeProps) {
  const { classes } = useStyles();
  const contactContext = useContact();
  return (
    <Zoom
      in={!!contactContext?.state.lng && isSolutionRefVisible}
      style={{
        transitionDelay:
          !!contactContext?.state.lng && isSolutionRefVisible
            ? `${400 + index * 100}ms`
            : "0ms",
        zIndex: "2",
      }}
    >
      <div
        className={`flex flex-col items-center rounded-[10px] px-10 py-5 ${styles.card}`}
      >
        <h2 className="text-[#737373]">{header}</h2>
        <img
          className="mt-4 mb-8 h-[123px] w-auto"
          src={img}
          alt="image"
          loading="lazy"
        />
        <Tooltip title={text}>
          <Box
            sx={{ maxHeight: 150, minHeight: 150, overflow: "hidden" }}
            component="p"
            className="text-center text-[#737373]"
          >
            {text}
          </Box>
        </Tooltip>
        {phoneNumber && (
          <span className={classes.contact_text}>
            <a href="tel:+935449996">
              <CallIcon fontSize="small" /> {phoneNumber}
            </a>
          </span>
        )}
        <div className="flex justify-center gap-4 mt-4">
          <a href={telegramLink} target="_blank">
            <img src={telegram} alt="telegram social-link" loading="lazy" />
          </a>

          <a href={instagramLink} target="_blank">
            <img src={instagram} alt="instagram social-link" loading="lazy" />
          </a>

          <a href={facebookLink} target="_blank">
            <img src={facebook} alt="facebook social-link" loading="lazy" />
          </a>
        </div>
      </div>
    </Zoom>
  );
}
