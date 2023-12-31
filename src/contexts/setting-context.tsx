import { createContext, useContext, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { supportedLanguages } from "../types/supportedLanguages";

interface Settings {
  direction?: "ltr" | "rtl";
  language: supportedLanguages;
  pinSidebar?: boolean;
  theme?: string;
}

export interface SettingsContextValue {
  settings: Settings;
  saveSettings: (update: Settings) => void;
}

interface SettingsProviderProps {
  children?: ReactNode;
}

const initialSettings: Settings = {
  direction: "ltr",
  language: "ru",
  pinSidebar: true,
  theme: "light",
};

export const restoreSettings = (): Settings | null => {
  let settings = null;

  try {
    const storedData = window.localStorage.getItem("settings");

    if (storedData) {
      settings = JSON.parse(storedData);
    } else {
      settings = {
        direction: "ltr",
        language: "ru",
        pinSidebar: true,
        theme: "light",
      };
    }
  } catch (err) {
    console.error(err);
  }

  return settings;
};

export const storeSettings = (settings: Settings): void => {
  window.localStorage.setItem("settings", JSON.stringify(settings));
};

export const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  saveSettings: () => {},
});

export const SettingsProvider: FC<SettingsProviderProps> = (props) => {
  const { children } = props;
  const [settings, setSettings] = useState<Settings>(initialSettings);

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setSettings(restoredSettings);
    }
  }, []);

  const saveSettings = (updatedSettings: Settings): void => {
    setSettings(updatedSettings);
    storeSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SettingsConsumer = SettingsContext.Consumer;

export const useSettings = () => useContext(SettingsContext);
