import React, { useCallback, useEffect, useState } from "react";
import { useLocalStorage, usePermission } from "react-use";
import { FeeNotificationSettings } from "~/types";

interface FeeNotificationContextAPI {
  notification: FeeNotificationSettings;
  setNotification: (notification: FeeNotificationSettings) => void;
  clearNotification: () => void;
}

const isExt = !!process.env.REACT_APP_EXTENSION;

const initialState: FeeNotificationSettings = { target: null, once: false };

export const FeeNotificationContext =
  React.createContext<FeeNotificationContextAPI>({
    notification: initialState,
    setNotification: () => {},
    clearNotification: () => {},
  });

// Web
// ======================================

export const FeeNotificationContextProviderWeb: React.FC = ({ children }) => {
  const [notification, setNotificationInternal, clearNotification] =
    useLocalStorage<FeeNotificationSettings>("fee-notification");
  const permission = usePermission({ name: "notifications" });

  const setNotification = useCallback(
    (settings: FeeNotificationSettings) => {
      if (permission === "granted") {
        setNotificationInternal(settings);
      } else if (permission !== "denied") {
        Notification.requestPermission()
          .then((status) => {
            if (status === "granted") {
              setNotificationInternal(settings);
            }
          })
          .catch((e) => console.info("Notification permission error: ", e));
      } else {
        console.info("Notification permission is denied!");
      }
    },
    [permission, setNotificationInternal]
  );

  return (
    <FeeNotificationContext.Provider
      value={{
        notification: notification ?? initialState,
        setNotification,
        clearNotification,
      }}
    >
      {children}
    </FeeNotificationContext.Provider>
  );
};

// Extension
// ======================================

export const FeeNotificationContextProviderExt: React.FC = ({ children }) => {
  const [state, setState] = useState<FeeNotificationSettings>(initialState);

  useEffect(() => {
    chrome.storage.local.get("feeNotification", ({ feeNotification }) =>
      setState(feeNotification ?? initialState)
    );
  }, []);

  const setNotification = (feeNotification: FeeNotificationSettings) => {
    chrome.storage.local.set({ feeNotification }, () =>
      setState(feeNotification)
    );
  };

  const clearNotification = () =>
    chrome.storage.local.get("feeNotification", ({ feeNotification }) => {
      const newState = { ...feeNotification, target: null };
      chrome.storage.local.set({ feeNotification: newState }, () =>
        setState(newState)
      );
    });

  return (
    <FeeNotificationContext.Provider
      value={{ notification: state, setNotification, clearNotification }}
    >
      {children}
    </FeeNotificationContext.Provider>
  );
};

export const FeeNotificationContextProvider = isExt
  ? FeeNotificationContextProviderExt
  : FeeNotificationContextProviderWeb;
