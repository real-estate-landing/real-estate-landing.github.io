import partnersImage from "../../../../assets/images/partners.png";
import Card from "./components/card/card";
import { useTranslation } from "react-i18next";
import { useContact } from "../../../../contexts/contact";
import { useInView } from "react-intersection-observer";
import { Slide } from "@mui/material";

export default function Partners() {
  const { ref: partnersRef, inView: isPartnersRefVisible } = useInView();
  const contactContext = useContact();
  const { t } = useTranslation();
  const partners = [
    {
      img: partnersImage,
      header: t("partnersHeader1"),
      text: t("partnersText1"),
    },
    {
      img: partnersImage,
      header: t("partnersHeader2"),
      text: t("partnersText2"),
    },
    {
      img: partnersImage,
      header: t("partnersHeader3"),
      text: t("partnersText3"),
    },
  ];

  const result = partners.map((partner, i) => {
    return (
      <Card
        img={partner.img}
        header={partner.header}
        text={partner.text}
        isSolutionRefVisible={isPartnersRefVisible}
        index={i}
      />
    );
  });
  return (
    <div className="px-[10px] min-[1050px]:px-[30px] py-12" ref={partnersRef}>
      <Slide
        direction="right"
        in={!!contactContext?.state.lng && isPartnersRefVisible}
        style={{ transitionDelay: "300ms" }}
      >
        <h2 className="font-bold sm:text-3xl text-2xl mb-8">
          {contactContext?.state.lng && t("partnersPrimaryText")}
        </h2>
      </Slide>
      <div className="max-w-4xl items-center justify-center flex flex-wrap mx-auto gap-6">
        {contactContext?.state.lng && result}
      </div>
    </div>
  );
}
