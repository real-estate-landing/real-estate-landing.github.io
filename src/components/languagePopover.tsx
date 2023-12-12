import { useRef, useState } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import type { SxProps } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
//imgs
import englandFlag from "../assets/images/england.jpg";
import russiaFlag from "../assets/images/russia.jpg";
import uzbekistanFlag from "../assets/images/uzbekistan.jpg";
import { supportedLanguages } from "../types/supportedLanguages";

interface LanguagePopoverProps {
  language: string;
  positionSidebar?: boolean;
  sidebarOpen?: boolean;
  onLanguageChange: (newLanguage: supportedLanguages) => void;
  sx?: SxProps;
}

const languageOptions = {
  en: {
    icon: englandFlag,
    label: "English",
  },
  uz: {
    icon: uzbekistanFlag,
    label: "O'zbekcha",
  },
  ru: {
    icon: russiaFlag,
    label: "Русский",
  },
  "uz-Cyrl-UZ": {
    icon: uzbekistanFlag,
    label: "Ўзбекча",
  },
};

export const LanguagePopover: FC<LanguagePopoverProps> = (props) => {
  const theme = useTheme();
  const { language, onLanguageChange, positionSidebar, sidebarOpen, ...other } =
    props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const anchorListRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  //   const { t } = useTranslation();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLanguageChange = (newLanguage: supportedLanguages): void => {
    onLanguageChange(newLanguage);
    setOpen(false);
  };

  const selectedOption = languageOptions[language as supportedLanguages];

  return (
    <>
      {positionSidebar ? (
        <Box ref={anchorListRef}>
          <ListItem
            key={selectedOption?.label}
            disablePadding
            sx={{
              display: "block",
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
            }}
            onClick={handleOpen}
            // ref={anchorRef}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: sidebarOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarOpen ? 3 : "auto",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <TranslateIcon />
              </ListItemIcon>
              <ListItemText
                primary={selectedOption?.label}
                sx={{ opacity: sidebarOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      ) : (
        <Button
          variant="contained"
          onClick={handleOpen}
          ref={anchorRef}
          {...other}
        >
          <TranslateIcon /> {selectedOption?.label}
        </Button>
      )}

      <Popover
        anchorEl={positionSidebar ? anchorListRef.current : anchorRef.current}
        anchorOrigin={
          positionSidebar
            ? { horizontal: "left", vertical: "bottom" }
            : {
                horizontal: "center",
                vertical: "bottom",
              }
        }
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 240 },
        }}
      >
        {Object.keys(languageOptions).map((option) => {
          const typedOption = option as supportedLanguages;
          return (
            <MenuItem
              onClick={() => handleLanguageChange(typedOption)}
              key={typedOption}
            >
              <ListItemIcon>
                <Box
                  sx={{
                    display: "flex",
                    height: 20,
                    width: "auto",
                    objectFit: "cover",
                    objectPosition: "top-left",
                    "& img": {
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "top-left",
                    },
                  }}
                >
                  <img
                    alt={languageOptions[typedOption].label}
                    src={languageOptions[typedOption].icon}
                    loading="lazy"
                  />
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography color="textPrimary" variant="subtitle2">
                    {languageOptions[typedOption].label}
                  </Typography>
                }
              />
            </MenuItem>
          );
        })}
      </Popover>
    </>
  );
};

LanguagePopover.propTypes = {
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
};
