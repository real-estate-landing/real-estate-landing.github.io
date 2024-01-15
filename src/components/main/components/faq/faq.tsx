import { useTranslation } from "react-i18next";
import SingleFaq from "./components/singleFaq/singleFaq";
import { Element } from "react-scroll";
import { useContact } from "../../../../contexts/contact";
import { Slide } from "@mui/material";
import { useInView } from "react-intersection-observer";

export default function Faq() {
  const contactContext = useContact();
  const { ref: faqRef, inView: isFaqRefVisible } = useInView();
  const { t } = useTranslation();
  const faqs = [
    {
      question: t("question1"),
      answer: t("answer1"),
    },
    {
      question: t("question2"),
      answer: t("answer2"),
    },
    {
      question: t("question3"),
      answer: t("answer3"),
    },
    {
      question: t("question4"),
      answer: t("answer4"),
    },
    {
      question: t("question5"),
      answer: t("answer5"),
    },
    {
      question: t("question6"),
      answer: t("answer6"),
    },
  ];

  const result = faqs.map((f, index) => {
    return (
      <SingleFaq
        key={index}
        question={f.question}
        answer={f.answer}
        isFaqRefVisible={isFaqRefVisible}
        index={index}
      />
    );
  });
  return (
    <Element name="faq">
      <div className="px-[10px] min-[1050px]:px-[30px] py-16" ref={faqRef}>
        <Slide
          direction="right"
          in={!!contactContext?.state.lng && isFaqRefVisible}
          style={{ transitionDelay: "300ms" }}
        >
          <h2 className="font-bold sm:text-3xl text-2xl mb-8">
            {contactContext?.state.lng && t("faqPrimaryText")}
          </h2>
        </Slide>
        <div className="flex flex-col gap-5">
          {contactContext?.state.lng && result}
        </div>
      </div>
    </Element>
  );
}
