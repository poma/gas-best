import React, { useCallback, useEffect, useState } from "react";
import { useLocalStorage, usePermission } from "react-use";
import { FeeNotificationSettings } from "~/types";

interface FeeNotificationContextAPI {
  notification: FeeNotificationSettings;
  setNotification: (notification: FeeNotificationSettings) => void;
  clearNotification: () => void;

  // Web only
  lastNotificationTime?: number;
  updateLastNotificationTime: () => void;
}

const isExt = !!process.env.REACT_APP_EXTENSION;

const initialState: FeeNotificationSettings = { target: null, once: false };
const noop = () => {};

export const FeeNotificationContext =
  React.createContext<FeeNotificationContextAPI>({
    notification: initialState,
    setNotification: noop,
    clearNotification: noop,
    lastNotificationTime: undefined,
    updateLastNotificationTime: noop,
  });

// Web
// ======================================

export const FeeNotificationContextProviderWeb: React.FC = ({ children }) => {
  const [notification, setNotificationInternal, clearNotification] =
    useLocalStorage<FeeNotificationSettings>("fee-notification");
  const [
    lastNotificationTime,
    setLastNotificationTime,
    clearLastNotificationTime,
  ] = useLocalStorage<number>("fee-notification-last");

  const updateLastNotificationTime = () => setLastNotificationTime(Date.now());
  const permission = usePermission({ name: "notifications" });

  const setNotification = useCallback(
    (settings: FeeNotificationSettings) => {
      if (permission === "granted") {
        setNotificationInternal(settings);
        clearLastNotificationTime();
      } else if (permission !== "denied") {
        Notification.requestPermission()
          .then((status) => {
            if (status === "granted") {
              setNotificationInternal(settings);
              clearLastNotificationTime();
            }
          })
          .catch((e) => console.info("Notification permission error: ", e));
      } else {
        console.info("Notification permission is denied!");
      }
    },
    [permission, setNotificationInternal, clearLastNotificationTime]
  );

  return (
    <FeeNotificationContext.Provider
      value={{
        notification: notification ?? initialState,
        setNotification,
        clearNotification,
        lastNotificationTime,
        updateLastNotificationTime,
      }}
    >
      {children}
    </FeeNotificationContext.Provider>
  );
};

// Extension
// ======================================

export const FeeNotificationContextProviderExt: React.FC = ({ children }) => {
  const [notification, setNotificationInternal] =
    useState<FeeNotificationSettings>(initialState);

  useEffect(() => {
    chrome.storage.local.get("feeNotification", ({ feeNotification }) => {
      setNotificationInternal(feeNotification ?? initialState);
    });
  }, []);

  const setNotification = (settings: FeeNotificationSettings) => {
    chrome.storage.local.set(
      { feeNotification: settings, feeNotificationLast: null },
      () => setNotificationInternal(settings)
    );
  };

  const clearNotification = () =>
    chrome.storage.local.set({ feeNotification: initialState }, () =>
      setNotificationInternal(initialState)
    );

  return (
    <FeeNotificationContext.Provider
      value={{
        notification,
        setNotification,
        clearNotification,
        updateLastNotificationTime: noop,
      }}
    >
      {children}
    </FeeNotificationContext.Provider>
  );
};

export const FeeNotificationContextProvider = isExt
  ? FeeNotificationContextProviderExt
  : FeeNotificationContextProviderWeb;
