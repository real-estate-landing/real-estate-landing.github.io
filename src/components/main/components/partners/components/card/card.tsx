import styles from "./card.module.css";
import { Zoom } from "@mui/material";
import { useContact } from "../../../../../../contexts/contact";

type typeProps = {
  img: string;
  text: string;
  header: string;
  isSolutionRefVisible: boolean;
  index: number;
};

export default function Card({
  img,
  text,
  header,
  isSolutionRefVisible,
  index,
}: typeProps) {
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
        <img className="mt-4 mb-8" src={img} alt="image" loading="lazy" />
        <p className="text-center text-[#737373]">{text}</p>
      </div>
    </Zoom>
  );
}
