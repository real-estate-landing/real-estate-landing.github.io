import styles from "./card.module.css";
import { Zoom } from "@mui/material";
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
        <p className="text-center text-[#737373]">{text}</p>
        <span className={classes.contact_text}>
          <a href="tel:+935449996">
            <CallIcon fontSize="small" /> + (93) 544-99-96
          </a>
        </span>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://t.me/KNTUZB" target="_blank">
            <img src={telegram} alt="telegram social-link" loading="lazy" />
          </a>

          <a href="https://www.instagram.com/kntuzb/" target="_blank">
            <img src={instagram} alt="instagram social-link" loading="lazy" />
          </a>

          <a href="https://www.facebook.com/KNTUZB" target="_blank">
            <img src={facebook} alt="facebook social-link" loading="lazy" />
          </a>
        </div>
      </div>
    </Zoom>
  );
}
