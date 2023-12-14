import { Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSwiper } from "swiper/react";

type Props = {
  value: number;
};

const SwiperController = ({ value }: Props) => {
  const [slide, setSlide] = useState(0);
  const divRef = useRef<HTMLButtonElement>(null);
  const swiper = useSwiper();
  useEffect(() => {
    setSlide(value);
    setTimeout(() => {
      divRef.current.click();
    }, 100);
  }, [value]);
  console.log({ value });
  return (
    <Button
      onClick={() => swiper.slideTo(slide)}
      ref={divRef}
      sx={{ display: "none" }}
    >
      hello
    </Button>
  );
};

export default SwiperController;
