import Tick from "../../../../../../assets/images/Check.png";
import { Zoom } from "@mui/material";
import { useContact } from "../../../../../../contexts/contact";

interface Props {
  text: string | undefined;
  isComplexRefVisible: boolean;
  index: number;
}

function Card({ text, index, isComplexRefVisible }: Props) {
  const contactContext = useContact();
  return (
    <Zoom
      in={!!contactContext?.state.lng && isComplexRefVisible}
      style={{
        transitionDelay:
          !!contactContext?.state.lng && isComplexRefVisible
            ? `${500 + index * 100}ms`
            : "0ms",
      }}
    >
      <div className="p-4 rounded-[10px] border-2 border-[#3F51B5] flex-1">
        <img src={Tick} alt="check-tick" loading="lazy" />
        <p>{!!contactContext?.state.lng && isComplexRefVisible && text}</p>
      </div>
    </Zoom>
  );
}

export default Card;
