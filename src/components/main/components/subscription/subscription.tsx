import bgEnvelope from "../../../../assets/images/Letter.png";
import { Alert, Button, Slide, Snackbar, TextField } from "@mui/material";
import { Link } from "react-history-switch";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { addUserForNews } from "../../../../lib/firebase/firestore";
import { useContact } from "../../../../contexts/contact";
import { useInView } from "react-intersection-observer";

export default function Subscription() {
  const { ref: subscriptionRef, inView: isSubscriptionRefVisible } =
    useInView();
  const contactContext = useContact();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [backStatus, setBackStatus] = useState("");
  const { t } = useTranslation();
  return (
    <>
      <div
        className="bg-[#F5F8FF] relative px-[10px] min-[1050px]:px-[30px] py-40"
        ref={subscriptionRef}
      >
        <div className="bg absolute top-0 left-0">
          <img src={bgEnvelope} alt="envelope" loading="lazy" />
        </div>
        <div className=" max-w-4xl flex flex-wrap justify-center items-center mx-auto gap-2">
          <div className="flex-1">
            <Slide
              direction="right"
              in={!!contactContext?.state.lng && isSubscriptionRefVisible}
              style={{ transitionDelay: "300ms" }}
            >
              <h2 className="text-[#3F51B5] text-3xl font-semibold">
                {contactContext?.state.lng && t("news_subs")}
              </h2>
            </Slide>
            <Slide
              direction="right"
              in={!!contactContext?.state.lng && isSubscriptionRefVisible}
              style={{ transitionDelay: "450ms" }}
            >
              <p>{contactContext?.state.lng && t("subs_explanation")}</p>
            </Slide>
          </div>
          <div className="w-full max-w-sm">
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                addUserForNews(email.trim(), name.trim())
                  .then((_res) => {
                    setBackStatus("success");
                  })
                  .catch((err) => {
                    setBackStatus(err.message);
                  });
              }}
              className="flex flex-1 items-center flex-col gap-2"
            >
              <Slide
                direction="left"
                in={!!contactContext?.state.lng && isSubscriptionRefVisible}
                style={{ transitionDelay: "300ms" }}
              >
                <TextField
                  type="text"
                  placeholder={contactContext?.state.lng && t("name")}
                  sx={{ width: "100%" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Slide>
              <Slide
                direction="left"
                in={!!contactContext?.state.lng && isSubscriptionRefVisible}
                style={{ transitionDelay: "450ms" }}
              >
                <TextField
                  type="mail"
                  placeholder={contactContext?.state.lng && t("email")}
                  sx={{ width: "100%" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Slide>
              <Slide
                direction="left"
                in={!!contactContext?.state.lng && isSubscriptionRefVisible}
                style={{ transitionDelay: "550ms" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%" }}
                >
                  {contactContext?.state.lng && t("subs_news")}
                </Button>
              </Slide>
              <Slide
                direction="left"
                in={!!contactContext?.state.lng && isSubscriptionRefVisible}
                style={{ transitionDelay: "650ms" }}
              >
                <p className="text-sm">
                  {contactContext?.state.lng && t("subs_news_exp")}
                  <Link to="/" className="text-[#3F51B5]">
                    {" "}
                    {contactContext?.state.lng && t("privacy_data")}
                  </Link>
                </p>
              </Slide>
            </form>
          </div>
        </div>
      </div>
      <Snackbar
        open={backStatus.length > 1}
        autoHideDuration={6000}
        onClose={() => setBackStatus("")}
      >
        {backStatus == "success" ? (
          <Alert severity="success" onClose={() => setBackStatus("")}>
            {contactContext?.state.lng && t("congratPrimary")}
          </Alert>
        ) : backStatus.includes("error" || "Error") ? (
          <Alert severity="error" onClose={() => setBackStatus("")}>
            {backStatus.slice(7) === "invalid_email"
              ? contactContext?.state.lng && t("invalid_email")
              : contactContext?.state.lng && t("errorPrimary")}
          </Alert>
        ) : (
          <Alert severity="warning" onClose={() => setBackStatus("")}>
            This is a warning message!
          </Alert>
        )}
      </Snackbar>
    </>
  );
}
