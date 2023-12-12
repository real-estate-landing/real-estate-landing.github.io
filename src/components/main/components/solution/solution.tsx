import { useTranslation } from "react-i18next";
import Tab from "./components/tab/tab";
import { Element } from "react-scroll";
import { useContact } from "../../../../contexts/contact";
import { Slide } from "@mui/material";
import { useInView } from "react-intersection-observer";

export default function Solution() {
  const contactContext = useContact();
  const { ref: solutionRef, inView: isSolutionRefVisible } = useInView();
  const { t } = useTranslation();
  const tabs: {
    id: number;
    tabTitle: string;
    tabHeader: string;
    tabList: string;
  }[] = [
    {
      id: 1,
      tabTitle: t("tabTitle1"),
      tabHeader: t("tabHeader1"),
      tabList: t("tabList1"),
    },
    {
      id: 2,
      tabTitle: t("tabTitle2"),
      tabHeader: t("tabHeader2"),
      tabList: t("tabList2"),
    },
    {
      id: 3,
      tabTitle: t("tabTitle3"),
      tabHeader: t("tabHeader3"),
      tabList: t("tabList3"),
    },
    {
      id: 4,
      tabTitle: t("tabTitle4"),
      tabHeader: t("tabHeader4"),
      tabList: t("tabList4"),
    },
    {
      id: 5,
      tabTitle: t("tabTitle5"),
      tabHeader: t("tabHeader5"),
      tabList: t("tabList5"),
    },
  ];

  return (
    <Element name="solutions">
      <div
        className="bg-[#F5F8FF] px-[10px] min-[1050px]:px-[30px] py-12 z-10"
        ref={solutionRef}
      >
        <Slide
          direction="right"
          in={!!contactContext?.state.lng && isSolutionRefVisible}
          style={{ transitionDelay: "200ms" }}
        >
          <h2 className="font-bold mb-8 sm:text-3xl text-2xl">
            {contactContext?.state.lng &&
              isSolutionRefVisible &&
              t("solutionPrimaryText")}
          </h2>
        </Slide>
        {contactContext?.state.lng && (
          <Tab tabs={tabs} isSolutionRefVisible={isSolutionRefVisible} />
        )}
      </div>
    </Element>
  );
}
