import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Slide,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContact } from "../../../../../../contexts/contact";

type faqType = {
  question: string;
  answer: string;
  isFaqRefVisible: boolean;
  index: number;
};

const SingleFaq = ({ question, answer, isFaqRefVisible, index }: faqType) => {
  const contactContext = useContact();
  return (
    <>
      <Slide
        direction="right"
        in={!!contactContext?.state.lng && isFaqRefVisible}
        style={{ transitionDelay: `${300 + index * 100}ms` }}
      >
        <Accordion
          sx={{ borderRadius: "10px", border: "none", outline: "none" }}
          key={index}
        >
          <AccordionSummary
            expandIcon={
              <div className="bg-[#3F51B5] flex items-center justify-center rounded-full w-[20px] h-[20px]">
                <ExpandMoreIcon sx={{ color: "white" }} />
              </div>
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              backgroundColor: "#F5F8FF",
              borderRadius: "10px",
              padding: "10px",
            }}
            // className="bg-[#F5F8FF] p-4 rounded-[10px]"
          >
            <h2 className="font-semibold">{question}</h2>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{answer}</Typography>
          </AccordionDetails>
        </Accordion>
      </Slide>
    </>
  );
};

export default SingleFaq;
