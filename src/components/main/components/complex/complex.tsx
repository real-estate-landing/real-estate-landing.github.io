import Text from "../../../../ui-components/text/Text";
import Card from "./components/card/card";
import frameEn from "../../../../assets/images/re_dev_en.png";
import frameRu from "../../../../assets/images/re_dev_ru.png";
import frameUz from "../../../../assets/images/re_dev_uz.png";
import frameUzCr from "../../../../assets/images/re_dev_uz_cyreal.png";
import { useTranslation } from "react-i18next";
import { Element } from "react-scroll";
import { useContact } from "../../../../contexts/contact";
import { useInView } from "react-intersection-observer";
import { Zoom } from "@mui/material";

export default function Complex() {
  const contactContext = useContact();
  const { ref: complexRef, inView: isComplexRefVisible } = useInView();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const frame =
    language == "en"
      ? frameEn
      : language === "ru"
      ? frameRu
      : language === "uz"
      ? frameUz
      : frameUzCr;

  return (
    <Element name="complex">
      <div className="px-[10px] min-[1050px]:px-[30px] py-12" ref={complexRef}>
        <Zoom
          in={!!contactContext?.state.lng && isComplexRefVisible}
          style={{ transitionDelay: "200ms" }}
        >
          <div>
            <Text
              primaryText={contactContext?.state.lng && t("complexPrimaryText")}
              secondaryText={
                contactContext?.state.lng && t("complexSecondaryText")
              }
            />
          </div>
        </Zoom>
        <Zoom
          in={!!contactContext?.state.lng && isComplexRefVisible}
          style={{
            transitionDelay:
              !!contactContext?.state.lng && isComplexRefVisible
                ? "300ms"
                : "0ms",
          }}
        >
          <div className="my-6 flex justify-center items-center">
            <img src={frame} alt="frame" loading="lazy" />
          </div>
        </Zoom>
        <div className="flex gap-6 mt-6 flex-wrap">
          <Card
            text={contactContext?.state.lng && t("card1")}
            index={0}
            isComplexRefVisible={isComplexRefVisible}
          />
          <Card
            text={contactContext?.state.lng && t("card2")}
            index={1}
            isComplexRefVisible={isComplexRefVisible}
          />
          <Card
            text={contactContext?.state.lng && t("card3")}
            index={2}
            isComplexRefVisible={isComplexRefVisible}
          />
          <Card
            text={contactContext?.state.lng && t("card4")}
            index={3}
            isComplexRefVisible={isComplexRefVisible}
          />
        </div>
      </div>
    </Element>
  );
}
