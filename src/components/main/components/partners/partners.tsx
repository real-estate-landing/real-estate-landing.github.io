// import partnersImage from "../../../../assets/images/partners.png";
import kntImg from "../../../../assets/images/knt.png";
import newHouseImg from "../../../../assets/images/newHouse.png";
import newLife from "../../../../assets/images/newLife.png";
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
      img: newHouseImg,
      header: t("partnersHeader1"),
      text: t("partnersText1"),
      telNumber: "+998946627878",
      instagram: "https://www.instagram.com/new.house.uz/?igsh=MzRlODBiNWFlZA%3D%3D",
      facebook: "",
      telegram: "https://t.me/NEWHOUSE_Nedvijka",
    },
    {
      img: kntImg,
      header: t("partnersHeader2"),
      text: t("partnersText2"),
      telNumber: "+998935449996",
      instagram: "https://www.instagram.com/kntuzb/",
      facebook: "https://www.facebook.com/KNTUZB",
      telegram: "https://t.me/KNTUZB",
    },
    {
      img: newLife,
      header: t("partnersHeader3"),
      text: t("partnersText3"),
      telNumber: "+998977773419",
      instagram: "https://www.instagram.com/itkeysofttech/",
      facebook: "https://www.facebook.com/ITKEYUZ?mibextid=LQQJ4d",
      telegram: "https://t.me/ITKEYUZB",
    },
  ];

  const result = partners.map((partner, i) => {
    return (
      <Card
        key={i}
        img={partner.img}
        header={partner.header}
        text={partner.text}
        contact={{
          phoneNumber: partner.telNumber,
          telegramLink: partner.telegram,
          instagramLink: partner.instagram,
          facebookLink: partner.facebook,
        }}
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
