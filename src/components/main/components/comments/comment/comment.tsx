import bgStar from "../../../../../assets/images/Property 33.png";
import star from "../../../../../assets/images/Star.png";
import { useContact } from "../../../../../contexts/contact";
import { Zoom } from "@mui/material";

type commentType = {
  comment: {
    id: number;
    name: string;
    position: string;
    rating: string;
    text: string;
  };
  key: number;
  isCommentsRefVisible: boolean;
};
export default function Comment({
  comment,
  isCommentsRefVisible,
  key,
}: commentType) {
  const contactContext = useContact();
  const resultStar = [];
  for (let i = 0; i < +comment.rating; i++) {
    resultStar.push(<img src={star} alt="star" loading="lazy" />);
  }
  return (
    <Zoom
      in={!!contactContext?.state.lng && isCommentsRefVisible}
      style={{
        transitionDelay:
          !!contactContext?.state.lng && isCommentsRefVisible
            ? `${500 + key * 100}ms`
            : "0ms",
      }}
    >
      <div className="px-6 py-8 bg-[#3F51B5] rounded-[10px] border border-[#F5F8FF] text-white text-sm relative">
        <h2 className="font-semibold text-xl mb-2">{comment.name}</h2>
        <p>{comment.position}</p>
        <div className="flex gap-2 my-3">{resultStar}</div>
        <p className="text-xs self-stretch">{comment.text}</p>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={bgStar} alt="bg-star" loading="lazy" />
        </div>
      </div>
    </Zoom>
  );
}
