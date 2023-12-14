import Comment from "./comment/comment";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Slide, useMediaQuery } from "@mui/material";
import { Element } from "react-scroll";
import { useContact } from "../../../../contexts/contact";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { makeStyles } from "../../../../styles";
import SwiperController from "./commentsController/commantsController";

const useStyles = makeStyles()(() => ({
  commentSwiper: {
    width: "90%",
  },
}));
export default function Comments() {
  const { classes } = useStyles();
  const { ref: commentsRef, inView: isCommentsRefVisible } = useInView();
  const contactContext = useContact();
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperRef>(null);
  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const isItLarge = useMediaQuery("(min-width:1050px)");
  const isItMiddle = useMediaQuery("(min-width:700px)");
  const isItSmall = useMediaQuery("(max-width:350px)");
  const primeNumber = isItLarge ? 3 : isItMiddle ? 2.5 : isItSmall ? 1 : 1.5;
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

  const result = comments.map((comment, index) => {
    return (
      <SwiperSlide key={index}>
        <Comment
          comment={comment}
          key={index}
          isCommentsRefVisible={isCommentsRefVisible}
        />
      </SwiperSlide>
    );
  });

  return (
    <Element name="reviews">
      <div
        className="px-[10px] min-[1050px]:px-[30px] py-8 relative"
        ref={commentsRef}
      >
        <Slide
          direction="right"
          in={!!contactContext?.state.lng && isCommentsRefVisible}
          style={{ transitionDelay: "300ms" }}
        >
          <h2 className="font-bold sm:text-3xl text-2xl mb-8">
            {contactContext?.state.lng && t("commentsPrimaryText")}
          </h2>
        </Slide>
        <Swiper
          ref={swiperRef}
          slidesPerView={primeNumber}
          spaceBetween={primeNumber * 10}
          pagination={{
            clickable: true,
          }}
          className={classes.commentSwiper}
          onSlideChange={() => {
            setIsBeginning(swiperRef?.current?.swiper?.isBeginning);
            setIsEnding(swiperRef?.current?.swiper?.isEnd);
          }}
          style={{
            position: "relative",
          }}
        >
          {result}
          <SwiperController isBeginning={isBeginning} isEnding={isEnding} />
        </Swiper>
      </div>
    </Element>
  );
}
