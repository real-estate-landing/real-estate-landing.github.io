import { useContact } from "../contexts/contact";
import { makeStyles } from "../styles";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import NiceImg from "../assets/images/image_1.png";
import { MuiTelInput } from "mui-tel-input";
import { addUserWhoWantsToTalk } from "../lib/firebase/firestore";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import Logo from "../assets/images/logo.png";

const useStyles = makeStyles()((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
  dialog: {
    width: "100%",
    margin: "auto",
    ".css-qvaail-MuiPaper-root-MuiDialog-paper": {
      backgroundColor: theme.palette.secondary.main,
      width: "100%",
      maxWidth: "600px",
      margin: "10px",
    },
  },
  dialogTitle: {
    backgroundColor: theme.palette.secondary.main,
  },
  dialogContent: {
    margin: "auto",
    backgroundColor: theme.palette.secondary.main,
    maxWidth: "600px",
  },
  dialogFormWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    backgroundColor: "transparent",
    width: "100%",
    maxWidth: "300px",
    border: "none",
    boxShadow: "none",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  input: {
    transform: "scaleY(0.9)",
    color: theme.palette.text.primary,
  },
  dialogContentText_primary: {
    color: theme.palette.primary.main,
    fontFamily: "Open Sans",
    fontSize: "25px",
    fontStyle: "normal",
    fontweight: "bold",
    lineHeight: "normal",
    textTransform: "uppercase",
    textAlign: "center",
  },
  dialogContentText_secondary: {
    color: theme.palette.text.primary,
    textAlign: "center",
    fontFamily: "Open Sans",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  dialogAction: {
    backgroundColor: theme.palette.secondary.main,
  },
  dialogActionBtn: {
    width: "100%",
    fontFamily: "Open Sans",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    letterSpacing: "0.6px",
    textTransform: "uppercase",
  },
  dialogContentCongrat: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.secondary.main,
  },
  dialogCongratTexts: {
    backgroundColor: "transparent",
    width: "100%",
    maxWidth: "300px",
    border: "none",
    boxShadow: "none",
  },
  nice_img: {},
  contact_text: {
    fontSize: "14px",
    fontWeight: "600",
  },
  logo_pack: {
    display: "flex",
    gap: "5px",
  },
  primary_text: {
    color: theme.palette.text.secondary,
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: "1.2rem",
  },
  secondary_text: {
    color: theme.palette.text.primary,
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: "1.2rem",
  },
  text_wrap: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
}));

function ContactModal() {
  const [, setHideSnackbar] = useState(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [backStatus, setBackStatus] = useState("");
  const contactContext = useContact();
  const { t } = useTranslation();
  const { classes, cx } = useStyles();

  useEffect(() => {
    if (backStatus === "success") {
      contactContext?.actions.closeModal();
    }
  }, [backStatus]);
  const handlePhoneChange = (newValue: string) => {
    setPhone(newValue);
  };
  return (
    <>
      <Dialog
        open={contactContext?.state.modalOpen ?? false}
        onClose={contactContext?.actions.closeModal}
        className={classes.dialog}
      >
        <IconButton
          aria-label="close"
          onClick={contactContext?.actions.closeModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          id="responsive-dialog-title"
          className={classes.dialogTitle}
        ></DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Paper className={classes.dialogFormWrap}>
            <DialogContentText className={classes.dialogContentText_primary}>
              {contactContext?.state.lng && t("modalPrimaryText")}
            </DialogContentText>
            <DialogContentText className={classes.dialogContentText_secondary}>
              {contactContext?.state.lng && t("modalSecondaryText")}
            </DialogContentText>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                addUserWhoWantsToTalk(phone.trim(), name.trim())
                  .then(() => {
                    setHideSnackbar(true);
                    setBackStatus("success");
                  })
                  .catch((err) => {
                    setHideSnackbar(true);
                    setBackStatus(err.message);
                  });
              }}
              className={classes.form}
            >
              <TextField
                fullWidth
                label={contactContext?.state.lng && t("name")}
                id="fullWidth"
                className={classes.input}
                value={name}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setName(e.target.value)}
                required
              />
              <MuiTelInput
                value={phone}
                onChange={handlePhoneChange}
                defaultCountry="UZ"
              />
              <Button
                type="submit"
                variant="contained"
                className={classes.dialogActionBtn}
              >
                {contactContext?.state.lng && t("submit")}
              </Button>
            </form>
            <Divider
              sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}
            />
            <Divider className="mt-4">
              <Chip label={t("h_tab4")} size="medium" />
            </Divider>
            <Box>
              <div className="flex flex-wrap justify-between items-center mb-2">
                <div className={classes.logo_pack}>
                  <img src={Logo} alt="logo" loading="lazy" />
                  <div className={classes.text_wrap}>
                    <span className={classes.primary_text}>Real</span>
                    <span className={classes.secondary_text}>Estate</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className={classes.contact_text}>
                    <a href="tel:+998977773419">
                      <CallIcon fontSize="small" /> +998977773419
                    </a>
                  </span>

                  <span className={classes.contact_text}>
                    <a href="mailto:support@itkey.uz">
                      <EmailIcon fontSize="small" /> @itkeysofttech
                    </a>
                  </span>
                </div>
              </div>
              <span className={cx(classes.contact_text)}>
                <PlaceIcon fontSize="small" />{" "}
                {contactContext?.state.lng && t("address")}
              </span>
            </Box>
          </Paper>
        </DialogContent>
        <DialogActions className={classes.dialogAction}></DialogActions>
      </Dialog>
      <Dialog
        open={backStatus === "success"}
        onClose={() => setBackStatus("")}
        className={classes.dialog}
      >
        <IconButton
          aria-label="close"
          onClick={() => setBackStatus("")}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          id="responsive-dialog-title"
          className={classes.dialogTitle}
        ></DialogTitle>
        <DialogContent className={classes.dialogContentCongrat}>
          <Paper className={classes.dialogCongratTexts}>
            <DialogContentText className={classes.dialogContentText_primary}>
              {contactContext?.state.lng && t("congratPrimary")}
            </DialogContentText>
            <DialogContentText className={classes.dialogContentText_secondary}>
              {contactContext?.state.lng && t("congratSecondary")}
            </DialogContentText>
          </Paper>
          <img
            src={NiceImg}
            alt="nice"
            className={classes.nice_img}
            loading="lazy"
          />
        </DialogContent>
        <DialogActions className={classes.dialogAction}></DialogActions>
      </Dialog>
      <Snackbar
        open={backStatus.length > 1}
        autoHideDuration={6000}
        onClose={() => setBackStatus("")}
      >
        {backStatus == "success" ? (
          <Alert severity="success" onClose={() => setBackStatus("")}>
            {contactContext?.state.lng && t("congratPrimary")}
          </Alert>
        ) : backStatus.includes("error") ? (
          <Alert severity="error" onClose={() => setBackStatus("")}>
            {backStatus.slice(7) === "invalid_phone"
              ? contactContext?.state.lng && t("invalid_phone")
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

export default ContactModal;
