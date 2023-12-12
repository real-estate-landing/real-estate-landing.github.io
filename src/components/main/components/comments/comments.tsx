import Comment from "./comment/comment";
import arrow from "../../../../assets/images/Chevron_Right_MD.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Slide, useMediaQuery } from "@mui/material";
import clsx from "clsx";
import { Element } from "react-scroll";
import { useContact } from "../../../../contexts/contact";
import { useInView } from "react-intersection-observer";

export default function Comments() {
  const { ref: commentsRef, inView: isCommentsRefVisible } = useInView();
  const contactContext = useContact();
  const { t } = useTranslation();
  let [left, setLeft] = useState(0);
  const [style, setStyle] = useState("0%");
  const isItLarge = useMediaQuery("(min-width:1050px)");
  const isItMiddle = useMediaQuery("(min-width:700px)");
  const isItSmall = useMediaQuery("(min-width:100px)");
  const primeNumber = isItLarge ? 1 : isItMiddle ? 2 : 1;
  const comments = [
    {
      id: 0,
      name: t("name0"),
      position: t("position0"),
      rating: t("rating0"),
      text: t("text0"),
    },
    {
      id: 1,
      name: t("name1"),
      position: t("position1"),
      rating: t("rating1"),
      text: t("text1"),
    },
    {
      id: 2,
      name: t("name2"),
      position: t("position2"),
      rating: t("rating2"),
      text: t("text2"),
    },
  ];
  console.log(isItLarge, isItMiddle, isItSmall);
  function getStyle() {
    return setStyle(`${(left * 95) / primeNumber}%`);
  }

  function toLeft() {
    if (left === 0) setLeft((left = primeNumber));
    else setLeft((left = left - 1));
    getStyle();
  }

  function toRight() {
    if (
      (isItLarge && left === primeNumber) ||
      (isItMiddle && left === primeNumber) ||
      (isItSmall && left === comments.length - 1 / primeNumber)
    ) {
      setLeft((left = 0));
    } else {
      setLeft((left = left + 1));
    }
    getStyle();
  }

  const result = comments.map((comment, index) => {
    return (
      <Comment
        comment={comment}
        key={index}
        isCommentsRefVisible={isCommentsRefVisible}
      />
    );
  });

  return (
    <Element name="reviews">
      <div className="px-[10px] min-[1050px]:px-[30px] py-8" ref={commentsRef}>
        <Slide
          direction="right"
          in={!!contactContext?.state.lng && isCommentsRefVisible}
          style={{ transitionDelay: "300ms" }}
        >
          <h2 className="font-bold sm:text-3xl text-2xl mb-8">
            {contactContext?.state.lng && t("commentsPrimaryText")}
          </h2>
        </Slide>
        <div
          className={`${
            isItLarge ? "px-20" : isItMiddle ? "px-14" : " px-6"
          } w-full relative overflow-hidden`}
        >
          <div
            style={{ right: style }}
            className={clsx(
              `transition-all duration-500 grid grid-flow-col gap-8 relative min-[1050px]:auto-cols-[calc((100%-2*32px)/3)] min-[700px]:auto-cols-[calc((100%-2*32px)/2)] min-[10px]:auto-cols-[calc((100%-2*32px)/1)]`
            )}
          >
            {contactContext?.state.lng && result}
          </div>
          <div className="left">
            <div className="bg-transparent flex justify-center items-center h-full absolute z-20 top-1/2 -translate-y-1/2 left-0">
              <img
                src={arrow}
                alt="arrow-left"
                onClick={() => toLeft()}
                loading="lazy"
              />
            </div>
            <div className="bg-transparent flex justify-center items-center h-full absolute z-20 top-1/2 -translate-y-1/2 right-0 rotate-180">
              <img
                src={arrow}
                alt="arrow-left"
                onClick={() => toRight()}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
}
